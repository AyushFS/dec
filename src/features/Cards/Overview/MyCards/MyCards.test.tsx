import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStateProvider } from '../../../GlobalState/GlobalStateProvider';
import { CardsProvider } from '../../CardsProvider';
import MyCards from './MyCards';
import { card } from '../../ManageCards/mocks/card';
import { CardDetails } from '../../ManageCards/interface';
import { cardModulePath } from '../../constants';

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockUseNavigate,
}));

jest.mock('../../../Auth/useAuth', () => ({
	__esModule: true,
	default: () => ({
		auth: {},
	}),
}));

let mockCards: CardDetails[] = [card];
let mockIsLoadingCards = false;
const mockReFetchCards = jest.fn();
jest.mock('../../UseCards', () => ({
	__esModule: true,
	default: () => ({
		cards: mockCards,
		reFetchCards: mockReFetchCards,
		isLoadingCards: mockIsLoadingCards,
	}),
}));

jest.mock('../../components/CreditCard/CreditCard', () => () => <div data-testid="credit-card-component" />);

const queryClient = new QueryClient();

const renderComponent = () => {
	return render(
		<QueryClientProvider client={queryClient}>
			<GlobalStateProvider>
				<BrowserRouter>
					<CardsProvider>
						<MyCards />
					</CardsProvider>
				</BrowserRouter>
			</GlobalStateProvider>
		</QueryClientProvider>
	);
};

describe('MyCards component', () => {
	beforeAll(() => {
		jest.clearAllMocks();
		jest.resetAllMocks();
	});
	test('renders MyCards component', () => {
		renderComponent();
		expect(screen.getByTestId('my-cards-component')).toBeInTheDocument();
		expect(screen.getByText('overview.my_cards.title')).toBeInTheDocument();
	});

	test('renders MyCards component with loading', () => {
		mockCards = [];
		mockIsLoadingCards = true;
		renderComponent();
		expect(screen.getByText('common.loading')).toBeInTheDocument();
	});

	test('renders MyCard with Credit Card when there are cards', () => {
		mockIsLoadingCards = false;
		mockCards = [card];
		renderComponent();
		expect(mockReFetchCards).toHaveBeenCalledTimes(1);
		expect(screen.getByTestId('credit-card-component')).toBeInTheDocument();
	});

	test('should not show card count when there is only 1 card', () => {
		mockIsLoadingCards = false;
		mockCards = [card];
		renderComponent();
		expect(mockReFetchCards).toHaveBeenCalledTimes(1);
		expect(screen.queryByTestId('card-count')).not.toBeInTheDocument();
	});

	test('should show card count when there are more than 1 cards', () => {
		mockIsLoadingCards = false;
		mockCards = [card, card];
		renderComponent();
		expect(mockReFetchCards).toHaveBeenCalledTimes(1);
		expect(screen.getByTestId('card-count')).toBeInTheDocument();
	});

	test('should go to manage cards page when clicked on View All Cards', () => {
		mockIsLoadingCards = false;
		mockCards = [card];
		renderComponent();
		screen.getByText('overview.my_cards.view_all_cards').click();
		expect(mockUseNavigate).toHaveBeenCalledTimes(1);
		expect(mockUseNavigate).toHaveBeenCalledWith(`${cardModulePath}/manage-cards`);
	});
});
