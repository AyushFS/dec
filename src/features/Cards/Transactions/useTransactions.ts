import { useContext } from 'react';
import { TransactionsContext } from './TransactionsProvider';

const useTransactions = () => {
	const context = useContext(TransactionsContext);
	if (context === undefined) {
		throw new Error('useTransactions must be used within a TransactionsProvider');
	}
	return context;
};

export default useTransactions;
