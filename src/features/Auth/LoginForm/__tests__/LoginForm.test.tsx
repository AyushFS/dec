import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { GlobalStateProvider } from '../../../GlobalState/GlobalStateProvider';
import handlers, { BASE_URL, publicKeyEndpoint } from '../mocks/handlers';
import LoginForm from '..';

const queryClient = new QueryClient();
const server = setupServer(...handlers);

describe('LoginForm component', () => {
	beforeAll(() => server.listen());
	// Reset any request handlers that we may add during the tests,
	// so they don't affect other tests.
	afterEach(() => server.resetHandlers());
	// Clean up after the tests are finished.
	afterAll(() => server.close());

	const renderLoginForm = () => {
		return render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<BrowserRouter>
						<LoginForm />
					</BrowserRouter>
				</GlobalStateProvider>
			</QueryClientProvider>
		);
	};

	test('renders LoginForm component', () => {
		renderLoginForm();
		expect(screen.getByTestId('login-form')).toBeInTheDocument();
		expect(screen.getByTestId('logo')).toBeInTheDocument();
		expect(screen.getByTestId('email-input')).toBeInTheDocument();
		expect(screen.getByTestId('password-input')).toBeInTheDocument();
	});

	describe('Form validation', () => {
		test('should show error message when email address is empty', () => {
			renderLoginForm();
			expect(screen.queryByTestId('email-input-error')).not.toBeInTheDocument();
			expect(screen.queryByTestId('password-input-error')).not.toBeInTheDocument();
			userEvent.click(screen.getByTestId('login-button'));
			expect(screen.getByTestId('email-input-error')).toBeInTheDocument();
			expect(screen.getByTestId('password-input-error')).toBeInTheDocument();
		});
		test('should not show error message when email address and password are not empty', async () => {
			renderLoginForm();
			userEvent.type(screen.getByTestId('email-input'), 'test@test.com');
			userEvent.type(screen.getByTestId('password-input'), 'dummypassword');
			userEvent.click(screen.getByTestId('login-button'));
			await waitFor(() => {
				expect(screen.queryByTestId('email-input-error')).not.toBeInTheDocument();
			});
			expect(screen.queryByTestId('password-input-error')).not.toBeInTheDocument();
		});
		test('should disable Login button when it calling auth APIs', async () => {
			renderLoginForm();
			userEvent.type(screen.getByTestId('email-input'), 'test@test.com');
			userEvent.type(screen.getByTestId('password-input'), 'dummypassword');
			expect(screen.getByTestId('login-button')).not.toBeDisabled();
			userEvent.click(screen.getByTestId('login-button'));
			await waitFor(() => {
				expect(screen.getByTestId('login-button')).toBeDisabled();
			});
		});
	});

	describe('Public Key API', () => {
		test('should show the error message if PublicKey fetching API fails', async () => {
			server.use(
				rest.get(`${BASE_URL}/${publicKeyEndpoint}`, (req, res, ctx) => {
					return res(ctx.status(500), ctx.json({ code: 'INTERNAL_SERVER_ERROR' }));
				})
			);
			renderLoginForm();
			userEvent.type(screen.getByTestId('email-input'), 'test@test.com');
			userEvent.type(screen.getByTestId('password-input'), 'dummypassword');
			userEvent.click(screen.getByTestId('login-button'));
			await waitFor(() => {
				expect(screen.getByTestId('public-key-error')).toBeInTheDocument();
			});
		});
	});
});
