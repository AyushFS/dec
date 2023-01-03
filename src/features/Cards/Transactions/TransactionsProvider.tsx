import React, { createContext, useMemo, useState } from 'react';
import { ReactFCC } from '../../../common/interface/react';
import { DateWiseTransactions, Transactions } from './types';
import useRequestTransactions from './useRequest';
import { mapTransactionEntitiesToTransactions } from './utils';

export interface TransactionsContextType {
	dateWiseTransactions: DateWiseTransactions;
	transactions: Transactions;
	refetchTransactions: () => void;
	isFetchingTransactions: boolean;
}

export const defaultTransactionsContext: TransactionsContextType = {
	dateWiseTransactions: [],
	transactions: [],
	refetchTransactions: () => {},
	isFetchingTransactions: false,
};

export const TransactionsContext = createContext<TransactionsContextType>(defaultTransactionsContext);

interface TransactionsProviderProps {}

export const TransactionsProvider: ReactFCC<TransactionsProviderProps> = ({ children }) => {
	const [transactions, setTransactions] = useState<Transactions>([]);
	const [dateWiseTransactions, setDateWiseTransactions] = useState<DateWiseTransactions>([]);

	const { isFetching: isFetchingTransactions, refetch: refetchTransactions } = useRequestTransactions({
		onSuccess: (response) => {
			const { transactions: transformedTransactions, dateWiseTransactions: transformedDateWiseTransactions } =
				mapTransactionEntitiesToTransactions(response.data);
			setTransactions(transformedTransactions);
			setDateWiseTransactions(transformedDateWiseTransactions);
		},
		onError: (err) => {
			console.log('Error in fetching transactions', err);
		},
		options: { enabled: false },
	});

	const contextValue = useMemo(
		() => ({
			dateWiseTransactions,
			transactions,
			refetchTransactions,
			isFetchingTransactions,
		}),
		[dateWiseTransactions, transactions, refetchTransactions, isFetchingTransactions]
	);
	return <TransactionsContext.Provider value={contextValue}>{children}</TransactionsContext.Provider>;
};
