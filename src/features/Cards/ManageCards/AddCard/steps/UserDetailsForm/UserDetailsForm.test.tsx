import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/lib/node';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthContext from '../../../../../Auth/AuthProvider';
import UserDetailsForm from './index';
import handlers from './mocks/handlers';
import { authContextValue, userData } from './mocks/testdata';
import { AddCardContext, defaultAddCardContext } from '../../AddCardProvider';

const queryClient = new QueryClient();
const server = setupServer(...handlers);
const pageTitle = 'manage_cards.add_card.user_details_form.page_title';
const continueButtonLabel = 'manage_cards.add_card.user_details_form.continue_button';
const cancelButtonLabel = 'manage_cards.add_card.user_details_form.cancel_button';

describe('UserDetailsForm component', () => {
	beforeAll(() => server.listen());
	afterEach(() => {
		server.resetHandlers();
		jest.resetAllMocks();
	});
	afterAll(() => server.close());

	const renderComponent = (authProps?: any, userDetailsFormProps?: any) => {
		const onCloseMock = jest.fn();
		const setUserDataMock = jest.fn();
		// eslint-disable-next-line react/jsx-no-constructed-context-values
		const updatedContext = { ...authContextValue, ...(authProps || {}) };
		// eslint-disable-next-line react/jsx-no-constructed-context-values
		const updatedAddCardContext = {
			...defaultAddCardContext,
			setUserData: setUserDataMock,
		};

		return {
			onCloseMock,
			setUserDataMock,
			...render(
				<QueryClientProvider client={queryClient}>
					<AuthContext.Provider value={updatedContext}>
						<AddCardContext.Provider value={updatedAddCardContext}>
							<UserDetailsForm onCancel={onCloseMock} {...(userDetailsFormProps || {})} />
						</AddCardContext.Provider>
					</AuthContext.Provider>
				</QueryClientProvider>
			),
		};
	};

	test('should render user details form component properly', async () => {
		renderComponent();
		expect(screen.getByText(pageTitle)).toBeInTheDocument();
		expect(screen.getByText(continueButtonLabel)).toBeInTheDocument();
		expect(screen.getByText(cancelButtonLabel)).toBeInTheDocument();
		expect(screen.getByText(cancelButtonLabel)).toBeInTheDocument();
		await waitFor(() => {
			expect(screen.getByText('Singaporean')).toBeInTheDocument();
		});
	});

	test('should trigger form validation when we continue the form without filling the mandatory fields', () => {
		renderComponent({ assignableRoles: '' });
		fireEvent.submit(screen.getByText(continueButtonLabel));
		expect(screen.getByText('manage_cards.add_card.user_details_form.name_required')).toBeInTheDocument();
		expect(screen.getByText('manage_cards.add_card.user_details_form.email_required')).toBeInTheDocument();
		expect(screen.getByText('manage_cards.add_card.user_details_form.nationality_required')).toBeInTheDocument();
		expect(screen.getByText('manage_cards.add_card.user_details_form.mobile_number_required')).toBeInTheDocument();
		expect(screen.getByText('manage_cards.add_card.user_details_form.role_required')).toBeInTheDocument();
	});

	test('should set the context when mandatory fields are provided on form submission', async () => {
		const { setUserDataMock } = renderComponent();
		await waitFor(() => {
			expect(screen.getByText(userData.nationality)).toBeInTheDocument();
		});
		fireEvent.input(screen.getByTestId('name'), { target: { value: userData.name } });
		fireEvent.change(screen.getByTestId('select-component-nationality'), { target: { value: userData.nationality } });
		fireEvent.input(screen.getByTestId('email'), { target: { value: userData.email } });
		fireEvent.input(screen.getByTestId('mobile-number-mobileNumber'), {
			target: { value: userData.mobilePhoneNumber },
		});
		fireEvent.submit(screen.getByText(continueButtonLabel));
		expect(setUserDataMock).toHaveBeenCalledWith(userData);
	});

	test('should call on continue callback when form is valid on form submission', async () => {
		const onContinueMock = jest.fn();
		renderComponent({}, { onContinue: onContinueMock });
		await waitFor(() => {
			expect(screen.getByText(userData.nationality)).toBeInTheDocument();
		});
		fireEvent.input(screen.getByTestId('name'), { target: { value: userData.name } });
		fireEvent.change(screen.getByTestId('select-component-nationality'), { target: { value: userData.nationality } });
		fireEvent.input(screen.getByTestId('email'), { target: { value: userData.email } });
		fireEvent.input(screen.getByTestId('mobile-number-mobileNumber'), {
			target: { value: userData.mobilePhoneNumber },
		});
		fireEvent.submit(screen.getByText(continueButtonLabel));
		expect(onContinueMock).toHaveBeenCalled();
	});
});
