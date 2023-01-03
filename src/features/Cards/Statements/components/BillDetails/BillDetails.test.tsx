import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GlobalStateProvider } from '../../../../GlobalState/GlobalStateProvider';
import BillDetails from './BillDetails';
import { Bill, StatementData } from '../../interface';

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

const statements: StatementData[] = [
	{
		uuid: 'uuid',
		generationYear: 2021,
		generationMonth: 1,
		dmsId: 1,
	},
];

const mockOnBackClick = jest.fn();
const mockOnPayNowClick = jest.fn();

jest.mock('../../../ManageCards/AddCard/BackButton/BackButton', () => () => (
	<div data-testid="back-button-component" />
));
jest.mock('../../../../../components/InfoBox', () => () => <div data-testid="info-box-component" />);
jest.mock('../../../../../components/DownloadFileComponent', () => () => <div data-testid="download-file-component" />);
jest.mock('../UnderstandBill', () => () => <div data-testid="understanding-bill-component" />);
jest.mock('../DueAmountAlertBox/utils', () => ({
	getWarningMessage: () => ({ message: 'test message', theme: 'primary' }),
}));

const queryClient = new QueryClient();

describe('BillDetails component', () => {
	test('renders BillDetails component', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<BillDetails
						bill={bill as Bill}
						statements={statements}
						onBackClick={mockOnBackClick}
						onPayNowClick={mockOnPayNowClick}
					/>
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByTestId('bill-details-component')).toBeInTheDocument();
		expect(screen.getByTestId('back-button-component')).toBeInTheDocument();
		expect(screen.getByTestId('info-box-component')).toBeInTheDocument();
		expect(screen.getByTestId('download-file-component')).toBeInTheDocument();
		expect(screen.getByTestId('understanding-bill-component')).toBeInTheDocument();
	});

	test('should not when there is no bill', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<BillDetails
						bill={{} as Bill}
						statements={statements}
						onBackClick={mockOnBackClick}
						onPayNowClick={mockOnPayNowClick}
					/>
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.queryByTestId('bill-details-component')).not.toBeInTheDocument();
	});

	test('should not when there is no totalOutstanding amount', () => {
		const billData = {
			...bill,
			totalOutstanding: '0',
		};
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<BillDetails
						bill={billData as Bill}
						statements={statements}
						onBackClick={mockOnBackClick}
						onPayNowClick={mockOnPayNowClick}
					/>
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.queryByTestId('bill-details-component')).not.toBeInTheDocument();
	});

	test('should show bill statement row with month when statement is available', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<BillDetails
						bill={bill as Bill}
						statements={statements}
						onBackClick={mockOnBackClick}
						onPayNowClick={mockOnPayNowClick}
					/>
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByText('statements.bill_details.statement (common.months_short.jan)')).toBeInTheDocument();
	});

	test('should show bill statement row without month when statement is not available', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<BillDetails
						bill={bill as Bill}
						statements={[]}
						onBackClick={mockOnBackClick}
						onPayNowClick={mockOnPayNowClick}
					/>
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByText('statements.bill_details.statement')).toBeInTheDocument();
	});

	test('should not show warningMessage when bill does not exist', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<BillDetails
						bill={{} as Bill}
						statements={statements}
						onBackClick={mockOnBackClick}
						onPayNowClick={mockOnPayNowClick}
					/>
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.queryByTestId('info-box-component')).not.toBeInTheDocument();
	});
});
