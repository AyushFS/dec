import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionSidebar from '.';
import transactionData from '../../mocks/transactions';

describe('TransactionSidebar component', () => {
	test('renders TransactionSidebar component', () => {
		render(<TransactionSidebar transaction={transactionData[0].data[0]} />);
		expect(screen.getByTestId('transaction-sidebar-component')).toBeInTheDocument();
	});
});
