import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient, QueryObserver } from 'react-query';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { act } from 'react-dom/test-utils';
import { GlobalStateProvider } from '../../../GlobalState/GlobalStateProvider';
import OtpModal from '../OtpModal';
import handlers, { BASE_URL, resendOtpEndpoint, verifyOtpEndpoint } from '../mocks/handlers';
import resendOtpSuccess from '../mocks/fixtures/resendOtpSuccess.json';
import otpModalProps from '../mocks/fixtures/otpModalProps.json';
import { inValidOtpValue, validOtpValue } from '../mocks/constants';

jest.useFakeTimers();

const server = setupServer(...handlers);
const onCancelMock = jest.fn();
const onSuccessMock = jest.fn();
const queryClient = new QueryClient();
const OtpModalProps = {
	...otpModalProps,
	onCancel: onCancelMock,
	onSuccess: onSuccessMock,
};

describe('OtpModal component', () => {
	beforeAll(() => server.listen());
	// Reset any request handlers that we may add during the tests,
	// so they don't affect other tests.
	afterEach(() => server.resetHandlers());
	// Clean up after the tests are finished.
	afterAll(() => server.close());

	const renderOtpModal = () => {
		return render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<BrowserRouter>
						<OtpModal {...OtpModalProps} />
					</BrowserRouter>
				</GlobalStateProvider>
			</QueryClientProvider>
		);
	};

	test('renders OtpModal component', () => {
		renderOtpModal();

		expect(screen.getByTestId('otp-modal')).toBeInTheDocument();
	});
	test('should call onCancel function when cancel button is pressed', () => {
		renderOtpModal();

		userEvent.click(screen.getByTestId('cancel-button'));
		expect(onCancelMock).toBeCalledTimes(1);
	});
	describe('Resend OTP button', () => {
		test('should call resend-otp API, show resending message and then shoe expired countdown message when resend link is pressed', async () => {
			const mockResendOtp = jest.fn();
			const observer = new QueryObserver(queryClient, { queryKey: 'resend-otp', enabled: false });
			const unsubscribeQuery = observer.subscribe(mockResendOtp);

			renderOtpModal();

			userEvent.click(screen.getByTestId('resend-link'));
			expect(mockResendOtp).toHaveBeenCalledTimes(1);
			await waitFor(() => {
				expect(screen.getByTestId('resending-msg')).toBeInTheDocument();
			});
			await waitFor(() => {
				expect(screen.queryByTestId('resending-msg')).not.toBeInTheDocument();
			});
			await waitFor(() => {
				expect(screen.queryByTestId('countdown-time-text')).toHaveTextContent(
					`0:${resendOtpSuccess.totp_expires_in / 1000}`
				);
			});
			act(() => {
				jest.runAllTimers();
			});
			await waitFor(() => {
				expect(screen.getByTestId('countdown-expired-text')).toBeInTheDocument();
			});
			unsubscribeQuery();
		});
		test('should show form error message when resend OTP api has error', async () => {
			server.use(
				rest.get(`${BASE_URL}/${resendOtpEndpoint}`, (req, res, ctx) => {
					return res(ctx.status(500), ctx.json({ code: 'INTERNAL_SERVER_ERROR' }));
				})
			);
			const mockResendOtp = jest.fn();
			const observer = new QueryObserver(queryClient, { queryKey: 'resend-otp', enabled: false });
			const unsubscribeQuery = observer.subscribe(mockResendOtp);

			renderOtpModal();

			expect(screen.queryByTestId('validate-otp-error')).not.toBeInTheDocument();
			userEvent.click(screen.getByTestId('resend-link'));
			await waitFor(() => {
				expect(screen.getByTestId('validate-otp-error')).toBeInTheDocument();
			});
			unsubscribeQuery();
		});
	});

	describe('Form submission', () => {
		test('should call set OTP state and should not throw error message when a value OTP value is set', () => {
			renderOtpModal();

			const otpInputTestId = 'otp-input';
			const otpInput = screen.getByTestId(otpInputTestId);
			expect(otpInput).toBeInTheDocument();
			expect(otpInput).toHaveValue('');
			userEvent.type(otpInput, validOtpValue);
			expect(otpInput).toHaveValue(validOtpValue);
			expect(screen.queryByTestId(`${otpInputTestId}-error`)).not.toBeInTheDocument();
		});
		test('should validate OTP when OTP input value changes', () => {
			renderOtpModal();

			const otpInputTestId = 'otp-input';
			const otpInput = screen.getByTestId(otpInputTestId);
			expect(otpInput).toBeInTheDocument();
			expect(otpInput).toHaveValue('');
			userEvent.type(otpInput, inValidOtpValue);
			expect(otpInput).toHaveValue(inValidOtpValue);
			expect(screen.getByTestId(`${otpInputTestId}-error`)).toBeInTheDocument();
		});
		test('should validate OTP when form is submitted', () => {
			const mockVerifyOtp = jest.fn();
			const observer = new QueryObserver(queryClient, { queryKey: 'verify-otp', enabled: false });
			const unsubscribeQuery = observer.subscribe(mockVerifyOtp);

			renderOtpModal();

			const otpInputTestId = 'otp-input';
			const otpInput = screen.getByTestId(otpInputTestId);
			userEvent.type(otpInput, inValidOtpValue);
			userEvent.click(screen.getByTestId('verify-button'));
			expect(screen.getByTestId(`${otpInputTestId}-error`)).toBeInTheDocument();
			expect(mockVerifyOtp).toHaveBeenCalledTimes(0);
			unsubscribeQuery();
		});
		test('should call onSuccess function when form is submitted successfully', async () => {
			const mockVerifyOtp = jest.fn();
			const observer = new QueryObserver(queryClient, { queryKey: 'verify-otp', enabled: false });
			const unsubscribeQuery = observer.subscribe(mockVerifyOtp);

			renderOtpModal();

			userEvent.type(screen.getByTestId('otp-input'), validOtpValue);
			userEvent.click(screen.getByTestId('verify-button'));
			await waitFor(() => {
				expect(onSuccessMock).toHaveBeenCalledTimes(1);
			});
			unsubscribeQuery();
		});
		test('should hide countdown when form is submitted', async () => {
			const mockVerifyOtp = jest.fn();
			const observer = new QueryObserver(queryClient, { queryKey: 'verify-otp', enabled: false });
			const unsubscribeQuery = observer.subscribe(mockVerifyOtp);

			renderOtpModal();

			expect(screen.getByTestId('countdown-time-text')).toBeInTheDocument();
			userEvent.type(screen.getByTestId('otp-input'), validOtpValue);
			userEvent.click(screen.getByTestId('verify-button'));
			expect(screen.queryByTestId('countdown-time-text')).not.toBeInTheDocument();
			await waitFor(() => {
				expect(onSuccessMock).toHaveBeenCalledTimes(1);
			});
			unsubscribeQuery();
		});
		test('should disable Verify and Cancel buttons when form is submitted', async () => {
			const mockVerifyOtp = jest.fn();
			const observer = new QueryObserver(queryClient, { queryKey: 'verify-otp', enabled: false });
			const unsubscribeQuery = observer.subscribe(mockVerifyOtp);

			renderOtpModal();

			const verifyButton = screen.getByTestId('verify-button');
			const cancelButton = screen.getByTestId('cancel-button');
			expect(verifyButton).not.toBeDisabled();
			expect(cancelButton).not.toBeDisabled();
			userEvent.type(screen.getByTestId('otp-input'), validOtpValue);
			userEvent.click(verifyButton);
			expect(verifyButton).toBeDisabled();
			expect(cancelButton).toBeDisabled();
			await waitFor(() => {
				expect(onSuccessMock).toHaveBeenCalledTimes(1);
			});
			unsubscribeQuery();
		});
		test('should validate OTP and call verify-otp query for valid OTP when form is submitted', async () => {
			const mockVerifyOtpQuery = jest.fn();
			const observer = new QueryObserver(queryClient, { queryKey: 'verify-otp', enabled: false });
			const unsubscribeQuery = observer.subscribe(mockVerifyOtpQuery);

			renderOtpModal();

			userEvent.type(screen.getByTestId('otp-input'), validOtpValue);
			userEvent.click(screen.getByTestId('verify-button'));
			expect(mockVerifyOtpQuery).toHaveBeenCalledTimes(1);
			await waitFor(() => {
				expect(onSuccessMock).toHaveBeenCalledTimes(1);
			});
			unsubscribeQuery();
		});
		test('should show form error message when form submission fails', async () => {
			server.use(
				rest.post(`${BASE_URL}/${verifyOtpEndpoint}`, (req, res, ctx) => {
					return res(ctx.status(500), ctx.json({ code: 'INTERNAL_SERVER_ERROR' }));
				})
			);
			const mockVerifyOtpQuery = jest.fn();
			const observer = new QueryObserver(queryClient, { queryKey: 'verify-otp', enabled: false });
			const unsubscribeQuery = observer.subscribe(mockVerifyOtpQuery);

			renderOtpModal();

			expect(screen.queryByTestId('validate-otp-error')).not.toBeInTheDocument();
			userEvent.type(screen.getByTestId('otp-input'), validOtpValue);
			userEvent.click(screen.getByTestId('verify-button'));
			await waitFor(() => {
				expect(screen.getByTestId('validate-otp-error')).toBeInTheDocument();
			});
			unsubscribeQuery();
		});
	});
});
