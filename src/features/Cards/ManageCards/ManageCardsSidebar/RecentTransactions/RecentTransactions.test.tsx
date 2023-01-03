import React from 'react';
import { render, screen } from '@testing-library/react';
import RecentTransactions from './RecentTransactions';
import card from '../../mocks/card';

jest.mock('./TransactionsList', () => () => <div data-testid="transactions-list-component" />);

describe('RecentTransactions component', () => {
	test('renders RecentTransactions component', () => {
		render(<RecentTransactions card={card} />);
		expect(screen.getByTestId('recent-transactions-component')).toBeInTheDocument();
		expect(screen.getByTestId('transactions-list-component')).toBeInTheDocument();
	});

	test('renders RecentTransactions component with correct button', () => {
		render(<RecentTransactions card={card} />);
		expect(screen.getByRole('button')).toBeInTheDocument();
		expect(screen.getByRole('button')).toHaveTextContent('See all');
	});
});
