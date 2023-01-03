import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import TransactionsList from './TransactionsList';
import card from '../../../mocks/card';

const queryClient = new QueryClient();

describe('TransactionsList component', () => {
	test('renders TransactionsList component', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<TransactionsList card={card} />
			</QueryClientProvider>
		);
		expect(screen.getByTestId('transactions-list-component')).toBeInTheDocument();
	});
});
