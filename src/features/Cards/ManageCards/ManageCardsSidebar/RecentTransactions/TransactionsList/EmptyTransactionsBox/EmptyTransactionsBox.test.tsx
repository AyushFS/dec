import React from 'react';
import { render, screen } from '@testing-library/react';
import EmptyTransactionsBox from './EmptyTransactionsBox';

describe('EmptyTransactionsBox component', () => {
	test('renders EmptyTransactionsBox component', () => {
		render(<EmptyTransactionsBox />);
		expect(screen.getByTestId('empty-transactions-component')).toBeInTheDocument();
	});

	test('renders EmptyTransactionsBox component with correct text', () => {
		render(<EmptyTransactionsBox />);
		expect(screen.getByTestId('empty-transactions-component')).toHaveTextContent(
			'Use your cards on online purchases, recurring payments and anywhere Mastercard® is accepted.'
		);
	});

	test('renders EmptyTransactionsBox component with correct button', () => {
		render(<EmptyTransactionsBox />);
		expect(screen.getByRole('button')).toBeInTheDocument();
		expect(screen.getByRole('button')).toHaveTextContent('Start spending');
	});
});
