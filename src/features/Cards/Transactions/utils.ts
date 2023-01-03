import { TRANSACTION_TYPE } from '../../../common/constant/enum/GeneralEnum';
import { getShortMonthYear } from '../../../common/utilities/dateTime';
import { TRANSACTION_STATUS, TRANSACTION_TYPE_LABEL } from './constants';
import { Transactions, TransactionEntities, DateWiseTransactions, Transaction, TransactionEntity } from './types';

type DateWiseTransactionMap = { [k in string]: Transactions };

const getDateWiseTransactions = (dateWiseTransactionMap: DateWiseTransactionMap): DateWiseTransactions =>
	Object.keys(dateWiseTransactionMap).map((date) => ({
		date,
		data: dateWiseTransactionMap[date],
	}));

export const mapTransactionEntitiesToTransactions = (
	transactionEntities: TransactionEntities
): { transactions: Transactions; dateWiseTransactions: DateWiseTransactions } => {
	const resultTransactions = [];
	const dateToTransactionsMap: { [k in string]: Transactions } = {};

	for (let i = 0; i < transactionEntities.length; i++) {
		const transactionEntity: TransactionEntity = transactionEntities[i];
		const transaction: Transaction = {
			id: transactionEntity.uuid,
			cardHolderName: '',
			amount: String(transactionEntity.amount),
			category: transactionEntity.category,
			merchantName: transactionEntity?.payload?.transaction?.merchant_details?.name,
			createdAt: transactionEntity.createdAt,
			currency: transactionEntity.currency,
			originalCurrency: transactionEntity.original_currency,
			originalAmount: String(transactionEntity.original_amount),
			transactionType: transactionEntity.payload?.debit_credit_indicator as TRANSACTION_TYPE,
			maskedCardNumber: transactionEntity.payload?.payment_instrument?.masked_number,
			transactionStatus: transactionEntity.transactionStatus as TRANSACTION_STATUS,
		};
		resultTransactions.push(transaction);
		const createdMontAndYear = getShortMonthYear(new Date(transaction.createdAt));
		dateToTransactionsMap[createdMontAndYear] = dateToTransactionsMap[createdMontAndYear] || [];
		dateToTransactionsMap[createdMontAndYear].push(transaction);
	}

	const result = getDateWiseTransactions(dateToTransactionsMap);

	return { transactions: resultTransactions, dateWiseTransactions: result };
};

export const getTransactionTypeLabel = (transactionType: TRANSACTION_TYPE) =>
	transactionType === TRANSACTION_TYPE.CREDIT ? TRANSACTION_TYPE_LABEL.CREDIT : TRANSACTION_TYPE_LABEL.DEBIT;
