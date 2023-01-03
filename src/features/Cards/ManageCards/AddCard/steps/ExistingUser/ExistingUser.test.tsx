import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/lib/node';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthContext from '../../../../../Auth/AuthProvider';
import CardsContext from '../../../../CardsProvider';
import getCardsSuccess from '../../../CardList/mocks/fixtures/getCardsSuccess.json';
import { AddCardContext, defaultAddCardContext } from '../../AddCardProvider';
import { authContextValue, userData } from '../UserDetailsForm/mocks/testdata';
import ExistingUser from './ExistingUser';
import handlers from './mocks/handlers';
import existingUserData from './mocks/testdata';

const pageTitle = 'manage_cards.add_card.existing_user_page.page_title';
const continueButtonLabel = 'manage_cards.add_card.existing_user_page.continue_button';
const cancelButtonLabel = 'manage_cards.add_card.existing_user_page.cancel_button';

const queryClient = new QueryClient();
const server = setupServer(...handlers);

describe('ExistingUser component', () => {
	beforeAll(() => server.listen());
	afterEach(() => {
		server.resetHandlers();
		jest.resetAllMocks();
	});
	afterAll(() => server.close());

	const renderComponent = (props?: any) => {
		const onCloseMock = jest.fn();
		const setUserDataMock = jest.fn().mockImplementation((data) => data());

		// eslint-disable-next-line react/jsx-no-constructed-context-values
		const updatedAddCardContext = {
			...defaultAddCardContext,
			userData,
			setUserData: setUserDataMock,
		};

		// eslint-disable-next-line react/jsx-no-constructed-context-values
		const cardsContext: any = {
			cards: getCardsSuccess.data.cards,
		};

		return {
			onCloseMock,
			setUserDataMock,
			...render(
				<QueryClientProvider client={queryClient}>
					<AuthContext.Provider value={authContextValue}>
						<CardsContext.Provider value={cardsContext}>
							<AddCardContext.Provider value={updatedAddCardContext}>
								<ExistingUser onCancel={onCloseMock} {...props} />
							</AddCardContext.Provider>
						</CardsContext.Provider>
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
		await waitFor(() => {
			expect(screen.getByText(existingUserData[0].user_fullname)).toBeInTheDocument();
		});
		expect(
			screen.getByText(`${existingUserData[0].user_email} ${existingUserData[0].user_mobile_phone_number}`)
		).toBeInTheDocument();
		expect(screen.getByText('2 cards')).toBeInTheDocument();
		expect(screen.getByText('User')).toBeInTheDocument(); // User role
	});

	test('should submit proper data when clicked on continue', async () => {
		const { setUserDataMock } = renderComponent();
		await waitFor(() => {
			expect(screen.getByText(existingUserData[1].user_fullname)).toBeInTheDocument();
		});
		fireEvent.click(screen.getByText(existingUserData[1].user_fullname));
		fireEvent.click(screen.getByText(continueButtonLabel));
		expect(setUserDataMock).toHaveBeenCalled();
	});

	test('should call continue callback when clicked on continue button', async () => {
		const onContinueMock = jest.fn();
		renderComponent({ onContinue: onContinueMock });
		await waitFor(() => {
			expect(screen.getByText(existingUserData[1].user_fullname)).toBeInTheDocument();
		});
		fireEvent.click(screen.getByText(continueButtonLabel));
		expect(onContinueMock).toHaveBeenCalled();
	});
});
