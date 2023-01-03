import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/lib/node';
import { QueryClient, QueryClientProvider } from 'react-query';
import { cardModulePath } from '../../constants';
import RecentTransactions from './RecentTransactions';
import handlers from './mocks/handlers';
import dateWiseTransactions from './mocks/dateWiseTransactions';

jest.mock('../../Transactions/components/EmptyTransactions', () => () => (
	<div data-testid="empty-transactions-component" />
));
jest.mock('../../Transactions/components/TransactionTable', () => () => (
	<div data-testid="transaction-table-component" />
));

let mockDateWiseTransactions: any = dateWiseTransactions;
jest.mock('../../Transactions/utils', () => ({
	mapTransactionEntitiesToTransactions: () => ({
		dateWiseTransactions: mockDateWiseTransactions,
	}),
}));

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockUseNavigate,
}));

const queryClient = new QueryClient();
const renderComponent = () =>
	render(
		<QueryClientProvider client={queryClient}>
			<RecentTransactions />
		</QueryClientProvider>
	);

const server = setupServer(...handlers);

describe('RecentTransactions component', () => {
	beforeAll(() => server.listen());
	afterEach(() => {
		server.resetHandlers();
		jest.resetAllMocks();
	});
	afterAll(() => server.close());

	test('renders RecentTransactions component', () => {
		renderComponent();
		expect(screen.getByTestId('recent-transactions-component')).toBeInTheDocument();
		expect(screen.getByText('overview.recent_transactions.title')).toBeInTheDocument();
		expect(screen.getByText('overview.recent_transactions.view_all_transactions')).toBeInTheDocument();
	});

	test('should go to transactions page when clicked on View All Transactions', () => {
		renderComponent();
		expect(screen.getByText('overview.recent_transactions.view_all_transactions')).toBeInTheDocument();
		screen.getByText('overview.recent_transactions.view_all_transactions').click();
		expect(mockUseNavigate).toHaveBeenCalledWith(`${cardModulePath}/transactions`);
	});

	test('renders loading state', () => {
		renderComponent();
		expect(screen.getByText('common.loading')).toBeInTheDocument();
	});

	test('should show empty transactions when no transactions are present', async () => {
		mockDateWiseTransactions = [];
		renderComponent();
		await waitFor(() => {
			expect(screen.getByTestId('empty-transactions-component')).toBeInTheDocument();
		});
	});

	test('should show transactions when transactions are present', async () => {
		mockDateWiseTransactions = dateWiseTransactions;
		renderComponent();
		await waitFor(() => {
			expect(screen.getByTestId('transaction-table-component')).toBeInTheDocument();
		});
		await waitFor(() => {
			expect(screen.getByText('overview.recent_transactions.transactions_are_secured')).toBeInTheDocument();
		});
	});
});
