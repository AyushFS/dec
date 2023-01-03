import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GlobalStateProvider } from '../../../../GlobalState/GlobalStateProvider';
import DueAmountBox from './DueAmountBox';
import { Bill } from '../../../Statements/interface';

jest.mock('../StatisticsCard', () => () => <div data-testid="statistics-card-component" />);

const queryClient = new QueryClient();
const mockOnPayBillClick = jest.fn();
const mockOnViewDetailsClick = jest.fn();
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

describe('DueAmountBox component', () => {
	test('renders DueAmountBox component', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<DueAmountBox
						bill={bill as Bill}
						onPayBillClick={mockOnPayBillClick}
						onViewDetailsClick={mockOnViewDetailsClick}
					/>
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByTestId('due-amount-box-component')).toBeInTheDocument();
		expect(screen.getByTestId('statistics-card-component')).toBeInTheDocument();
	});
});
