import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionRowGroup from '.';
import transactionData from '../../../mocks/transactions';
import { Transaction } from '../../../types';

describe('TransactionRowGroup component', () => {
	test('renders TransactionRowGroup component', () => {
		render(
			<TransactionRowGroup
				dateWiseTransaction={transactionData[0]}
				onTransactionClick={jest.fn()}
				currentTransaction={{} as Transaction}
			/>
		);
		expect(screen.getByTestId('transaction-row-group-component')).toBeInTheDocument();
	});
});
