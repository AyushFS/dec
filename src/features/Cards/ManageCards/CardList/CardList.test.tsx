import React, { useEffect } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { setupServer } from 'msw/lib/node';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GlobalStateProvider } from '../../../GlobalState/GlobalStateProvider';
import useCards from '../../UseCards';
import { CardsProvider } from '../../CardsProvider';
import handlers from './mocks/handlers';
import { ManageCardsProvider } from '../ManageCardsProvider';
import CardList from './CardList';

const queryClient = new QueryClient();
const server = setupServer(...handlers);

jest.mock('./CardListItem/CardListItem', () => () => <div data-testid="card-list-item-component" />);

const CardListComponent = ({ onCardClickMock }: { onCardClickMock: any }) => {
	const { reFetchCards } = useCards();
	useEffect(() => {
		reFetchCards();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return <CardList onCardClick={onCardClickMock} />;
};

describe('CardList component', () => {
	const renderComponent = () => {
		const onCardClickMock = jest.fn();
		return {
			mockonCardClick: onCardClickMock,
			...render(
				<QueryClientProvider client={queryClient}>
					<GlobalStateProvider>
						<BrowserRouter>
							<CardsProvider>
								<ManageCardsProvider>
									<CardListComponent onCardClickMock={onCardClickMock} />
								</ManageCardsProvider>
							</CardsProvider>
						</BrowserRouter>
					</GlobalStateProvider>
				</QueryClientProvider>
			),
		};
	};

	beforeAll(() => server.listen());
	afterEach(() => server.resetHandlers());
	afterAll(() => server.close());

	test('renders CardList component', async () => {
		renderComponent();
		expect(screen.getByTestId('card-list-component')).toBeInTheDocument();
	});

	test('should renders list of cards', async () => {
		renderComponent();
		expect(screen.getByText('Loading...')).toBeInTheDocument();
		await waitFor(() => {
			expect(screen.getAllByTestId('card-list-item-component').length).toBe(2);
		});
	});
});
