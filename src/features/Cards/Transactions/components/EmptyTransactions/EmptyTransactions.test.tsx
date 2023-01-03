import React from 'react';
import { render, screen } from '@testing-library/react';
import EmptyTransactions from './EmptyTransactions';

describe('EmptyTransactions component', () => {
	test('renders EmptyTransactions component', () => {
		render(<EmptyTransactions />);
		expect(screen.getByTestId('empty-transactions-component')).toBeInTheDocument();
	});
});
