import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GlobalStateProvider } from '../../../../GlobalState/GlobalStateProvider';
import DueAmountAlertBox from './DueAmountAlertBox';
import { Bill } from '../../interface';

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

const mockOnPayNowClick = jest.fn();
const mockOnViewDetailsClick = jest.fn();

const queryClient = new QueryClient();

describe('DueAmountAlertBox component', () => {
	test('renders DueAmountAlertBox component', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<DueAmountAlertBox
						bill={bill as Bill}
						onPayNowClick={mockOnPayNowClick}
						onViewDetailsClick={mockOnViewDetailsClick}
					/>
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByTestId('due-amount-alert-box-component')).toBeInTheDocument();
	});

	test('should show not show any alert if there is no amount due', () => {
		const billDataWithNoAmountDue = {
			paymentDueDate: '2022-11-18T00:00:00+08:00',
			statementAmount: '0',
			totalPaymentMade: '0',
			rolloverInterestFee: '0',
			lateFee: '0',
			totalOutstanding: '0',
			minimumAmountDue: '0',
			minimumAmountDuePaid: true,
			previousOutstandingAmount: '0',
			previousStatementAmount: '0',
			isFetched: false,
		};
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<DueAmountAlertBox
						bill={billDataWithNoAmountDue as Bill}
						onPayNowClick={mockOnPayNowClick}
						onViewDetailsClick={mockOnViewDetailsClick}
					/>
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.queryByTestId('info-box-component')).not.toBeInTheDocument();
	});
});
