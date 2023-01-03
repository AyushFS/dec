export interface StatementData {
	uuid: string;
	generationYear: number;
	generationMonth: number;
	dmsId: number;
}

export interface StatementProps {
	statementData: StatementData[];
}

export interface StatementsResponse {
	data: StatementData[];
	total: number;
}

export interface Bill {
	minimumAmountDue: string;
	minimumAmountDuePaid: boolean;
	lateFee: string;
	paymentDueDate: string;
	previousStatementAmount: string;
	rolloverInterestFee: string;
	statementAmount: string;
	totalOutstanding: string;
	totalPaymentMade: string;
	isFetched: boolean;
}

export type NotifyRepaymentTransferred = null;
