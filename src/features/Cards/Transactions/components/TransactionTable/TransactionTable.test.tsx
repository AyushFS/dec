import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionTable from '.';
import transactionData from '../../mocks/transactions';
import { Transaction } from '../../types';

describe('TransactionTable component', () => {
	test('renders TransactionTable component', () => {
		render(
			<TransactionTable
				dateWiseTransactions={transactionData}
				onTransactionClick={jest.fn()}
				currentTransaction={{} as Transaction}
			/>
		);
		expect(screen.getByTestId('transaction-table-component')).toBeInTheDocument();
	});
});
