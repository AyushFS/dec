import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import PayBill from './PayBill';
import { Bill } from '../../interface';
import { GlobalStateProvider } from '../../../../GlobalState/GlobalStateProvider';

jest.mock('./BankDetails', () => () => <div data-testid="bank-details-component" />);
jest.mock('../../../ManageCards/AddCard/BackButton/BackButton', () => () => (
	<div data-testid="back-button-component" />
));

const bill = {
	paymentDueDate: '2022-11-18T00:00:00+08:00',
	statementAmount: '2',
	totalPaymentMade: '0',
	rolloverInterestFee: '267.93',
	lateFee: '0',
	totalOutstanding: '15796.83',
	minimumAmountDue: '312.58',
	minimumAmountDuePaid: false,
	previousOutstandingAmount: '15628.9',
	previousStatementAmount: '15628.9',
	isFetched: false,
};

const mockOnBackClick = jest.fn();
const mockOnPaidClick = jest.fn();
const mockOnPayLaterClick = jest.fn();

const queryClient = new QueryClient();

describe('PayBill component', () => {
	test('renders PayBill component', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<PayBill
						bill={bill as Bill}
						onBackClick={mockOnBackClick}
						onPaidClick={mockOnPaidClick}
						onPayLaterClick={mockOnPayLaterClick}
					/>
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByTestId('pay-bill-component')).toBeInTheDocument();
	});
});
