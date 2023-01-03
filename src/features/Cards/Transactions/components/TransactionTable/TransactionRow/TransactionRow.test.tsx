import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TransactionRow from '.';
import transactionData from '../../../mocks/transactions';

describe('TransactionRow component', () => {
	test('renders TransactionRow component', () => {
		render(<TransactionRow transaction={transactionData[0].data[0]} onTransactionClick={jest.fn()} selected={false} />);
		expect(screen.getByTestId('transaction-row-component')).toBeInTheDocument();
	});

	test('should call onClick callback on component selection', () => {
		const onTransactionClickMock = jest.fn();
		render(
			<TransactionRow transaction={transactionData[0].data[0]} onTransactionClick={onTransactionClickMock} selected />
		);
		fireEvent.click(screen.getByTestId('transaction-row-component'));
		expect(onTransactionClickMock).toHaveBeenCalled();
	});
});
