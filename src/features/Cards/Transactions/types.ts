import { TRANSACTION_TYPE } from '../../../common/constant/enum/GeneralEnum';
import { TRANSACTION_STATUS } from './constants';

export interface TransactionEntity {
	currency: string;
	amount: number;
	original_currency: string;
	original_amount: number;
	countryCode: string;
	createdAt: string;
	transactionStatus: string;
	uuid: string;
	/* Use this field to get card status */
	cardUuid: string;
	category: string;
	payload: {
		debit_credit_indicator: string;
		transaction: {
			merchant_details: {
				name: string;
			};
		};
		payment_instrument: {
			masked_number: string;
			balance_type: string;
		};
	};
}

export type TransactionEntities = Array<TransactionEntity>;

export interface Transaction {
	id: string;
	currency: string;
	originalCurrency: string;
	originalAmount: string;
	createdAt: string;
	merchantName: string;
	category: string;
	cardHolderName: string;
	maskedCardNumber: string;
	amount: string;
	transactionType: TRANSACTION_TYPE;
	transactionStatus: TRANSACTION_STATUS;
}

export type Transactions = Array<Transaction>;
export interface DateWiseTransaction {
	date: string;
	data: Transactions;
}

export type DateWiseTransactions = DateWiseTransaction[];

export type GetTransactionsResponse = { data: TransactionEntities; total: number };
