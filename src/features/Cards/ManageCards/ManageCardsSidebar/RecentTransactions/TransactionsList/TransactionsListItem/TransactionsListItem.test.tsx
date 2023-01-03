import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionsListItem from './TransactionsListItem';
import transaction from '../../../../mocks/transaction';

describe('TransactionsList component', () => {
	test('renders TransactionsList component', () => {
		render(<TransactionsListItem transaction={transaction} />);
		expect(screen.getByTestId('transactions-list-item-component')).toBeInTheDocument();
	});
});
