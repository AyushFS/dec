import React from 'react';
import { screen, render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import TransactionsPage from './TransactionsPage';
import { GlobalStateProvider } from '../../GlobalState/GlobalStateProvider';

const queryClient = new QueryClient();
jest.mock('../Transactions/Transactions', () => () => <div data-testid="transactions-component" />);

describe('TransactionsPage component', () => {
	afterAll(() => jest.resetAllMocks());

	test('renders TransactionPage page component', async () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<BrowserRouter>
						<TransactionsPage />
					</BrowserRouter>
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByTestId('transactions-page')).toBeInTheDocument();
		expect(screen.getByTestId('transactions-component')).toBeInTheDocument();
	});
});
