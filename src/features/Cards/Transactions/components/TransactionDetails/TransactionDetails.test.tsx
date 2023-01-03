import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionDetails from '.';
import transactionData from '../../mocks/transactions';

describe('TransactionDetails component', () => {
	test('renders TransactionDetails component', () => {
		render(<TransactionDetails transaction={transactionData[0].data[0]} />);
		expect(screen.getByTestId('transaction-details-component')).toBeInTheDocument();
	});
});
