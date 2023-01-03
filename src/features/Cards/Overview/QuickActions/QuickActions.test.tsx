import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStateProvider } from '../../../GlobalState/GlobalStateProvider';
import { card } from '../../ManageCards/mocks/card';
import QuickActions from './QuickActions';
import { CardsProvider } from '../../CardsProvider';
import { CardDetails } from '../../ManageCards/interface';

const queryClient = new QueryClient();
const cardList: CardDetails[] = [];
jest.mock('../../UseCards', () => ({
	__esModule: true,
	default: () => ({
		cards: cardList,
	}),
}));

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockUseNavigate,
}));

const renderComponent = (props?: any) =>
	render(
		<QueryClientProvider client={queryClient}>
			<GlobalStateProvider>
				<CardsProvider>
					<BrowserRouter>
						<QuickActions {...props} />
					</BrowserRouter>
				</CardsProvider>
			</GlobalStateProvider>
		</QueryClientProvider>
	);

describe('QuickActions component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.resetAllMocks();
	});

	test('renders QuickActions component', () => {
		renderComponent();
		expect(screen.getByTestId('quick-actions-component')).toBeInTheDocument();
		expect(screen.getByText('overview.quick_actions.title')).toBeInTheDocument();
		expect(screen.getAllByTestId('quick-action-component').length).toBe(6);
	});

	test('should not redirect when click on QuickAction component when there is no card', () => {
		renderComponent();
		const quickAction = screen.getAllByTestId('quick-action-component')[0];
		quickAction.click();
		expect(mockUseNavigate).not.toBeCalled();
	});

	test('should redirect when click on QuickAction component when there are cards', () => {
		if (!cardList.length) cardList.push(card);
		renderComponent();
		const quickAction = screen.getAllByTestId('quick-action-component')[0];
		quickAction.click();
		expect(mockUseNavigate).toBeCalled();
	});
});
