import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { setupServer } from 'msw/lib/node';
import { BrowserRouter } from 'react-router-dom';
import ManageCards from './ManageCards';
import { ManageCardsProvider } from './ManageCardsProvider';
import { GlobalStateProvider } from '../../GlobalState/GlobalStateProvider';
import handlers from './mocks/handlers';
import { getCardsResponse } from './mocks/card';
import { CardsProvider } from '../CardsProvider';

jest.mock('../../../components/StickyHeader', () => ({ children }: any) => (
	<div data-testid="sticky-header-component">{children}</div>
));
jest.mock('../../Auth/useAuth', () => ({
	__esModule: true,
	default: () => ({
		auth: {
			member_uuid: 'c7043e04-2a2d-411b-9643',
		},
		permissions: ['cards-summary.view'],
	}),
}));

const queryClient = new QueryClient();
const server = setupServer(...handlers);

describe('ManageCards component', () => {
	beforeAll(() => server.listen());
	afterEach(() => {
		server.resetHandlers();
		jest.resetAllMocks();
		cleanup();
	});
	afterAll(() => server.close());

	const renderComponent = () =>
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<BrowserRouter>
						<CardsProvider>
							<ManageCardsProvider>
								<ManageCards />
							</ManageCardsProvider>
						</CardsProvider>
					</BrowserRouter>
				</GlobalStateProvider>
			</QueryClientProvider>
		);

	test('renders ManageCards component', () => {
		renderComponent();
		expect(screen.getByTestId('manage-cards-component')).toBeInTheDocument();
		expect(screen.getByTestId('sticky-header-component')).toBeInTheDocument();
		expect(screen.getByTestId('manage-cards-header-component')).toBeInTheDocument();
		expect(screen.getByTestId('card-list-component')).toBeInTheDocument();
		expect(screen.getByTestId('add-card-box-component')).toBeInTheDocument();
	});

	test('should render add card flow', async () => {
		renderComponent();
		fireEvent.click(screen.getByText('manage_cards.add_card_button'));
		await waitFor(() => {
			expect(screen.getByTestId('add-card-container')).toBeInTheDocument();
		});
	});

	test('should render card activation flow', async () => {
		renderComponent();
		await waitFor(() => {
			expect(screen.getByText(getCardsResponse.cards[1].nameOnCard)).toBeInTheDocument();
		});
		fireEvent.click(screen.getByText(getCardsResponse.cards[1].nameOnCard));
		await waitFor(() => {
			expect(screen.getByText('manage_cards.card_details.activate_card_box.button')).toBeInTheDocument();
		});

		fireEvent.click(screen.getByText('manage_cards.card_details.activate_card_box.button'));
		await waitFor(() => {
			expect(screen.getByText('manage_cards.activate_card.director_selection.page_title')).toBeInTheDocument();
		});
	});

	test('should render manage card limit flow flow', async () => {
		renderComponent();
		await waitFor(() => {
			expect(screen.getByText(getCardsResponse.cards[0].nameOnCard)).toBeInTheDocument();
		});
		// TODO: fix this double click
		fireEvent.click(screen.getByText(getCardsResponse.cards[0].nameOnCard));
		fireEvent.click(screen.getByText(getCardsResponse.cards[0].nameOnCard));
		await waitFor(() => {
			expect(screen.getByText('manage_cards.card_details.manage_limit')).toBeInTheDocument();
		});

		fireEvent.click(screen.getByText('manage_cards.card_details.manage_limit'));
		await waitFor(() => {
			expect(screen.getByText('manage_cards.manage_limit.understand_card_spending_modal.title')).toBeInTheDocument();
		});
	});
});
