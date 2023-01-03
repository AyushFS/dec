import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { setupServer } from 'msw/lib/node';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthContext from '../../../../../Auth/AuthProvider';
import handlers from './mocks/handlers';
import SpecifyLimit from './index';
import { authContextValue, userData } from '../UserDetailsForm/mocks/testdata';
import { AddCardContext, defaultAddCardContext } from '../../AddCardProvider';
import AddCardFooter from '../../AddCardFooter/AddCardFooter';

const queryClient = new QueryClient();
const server = setupServer(...handlers);
const pageTitle = 'manage_cards.add_card.specify_limit_page.page_title';
const continueButtonLabel = 'manage_cards.add_card.specify_limit_page.continue_button';
const cancelButtonLabel = 'manage_cards.add_card.specify_limit_page.cancel_button';
const formData = {
	spendLimit: 10000,
	spendPurpose: 'test-uuid',
};

describe('SpecifyLimit component', () => {
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
			userData,
		};

		return {
			onCloseMock,
			setUserDataMock,
			...render(
				<QueryClientProvider client={queryClient}>
					<AuthContext.Provider value={updatedContext}>
						<AddCardContext.Provider value={updatedAddCardContext}>
							<SpecifyLimit onCancel={onCloseMock} footerComponent={AddCardFooter} {...(userDetailsFormProps || {})} />
						</AddCardContext.Provider>
					</AuthContext.Provider>
				</QueryClientProvider>
			),
		};
	};

	test('should render specify limit page properly', async () => {
		renderComponent();
		expect(screen.getByText(pageTitle)).toBeInTheDocument();
		expect(screen.getByText(continueButtonLabel)).toBeInTheDocument();
		expect(screen.getByText(cancelButtonLabel)).toBeInTheDocument();
		expect(screen.getByText(cancelButtonLabel)).toBeInTheDocument();
		await waitFor(() => {
			expect(screen.getByText('test-label')).toBeInTheDocument();
		});
	});

	test('should trigger form validation when we continue the form without filling the mandatory fields', () => {
		renderComponent({ auth: '' });
		fireEvent.submit(screen.getByText(continueButtonLabel));
		expect(screen.getByText('manage_cards.add_card.specify_limit_page.spend_limit_required')).toBeInTheDocument();
		expect(screen.getByText('manage_cards.add_card.specify_limit_page.spend_purpose_required')).toBeInTheDocument();
	});

	test('should show the confirmation modal on successful form submission', async () => {
		renderComponent();
		await waitFor(() => {
			expect(screen.getByText('test-label')).toBeInTheDocument();
		});
		fireEvent.input(screen.getByTestId('spend-limit'), { target: { value: formData.spendLimit } });
		fireEvent.change(screen.getByTestId('select-component-spendPurpose'), { target: { value: formData.spendPurpose } });
		fireEvent.submit(screen.getByText(continueButtonLabel));
		await waitFor(() => {
			expect(screen.getByTestId('modal-component')).toBeInTheDocument();
		});
	});
});
