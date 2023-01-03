import React, { memo, FC, useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import EmptyTransactions from './components/EmptyTransactions';
import styles from './Transactions.module.scss';
import useTransactions from './useTransactions';
import TransactionTable from './components/TransactionTable/TransactionTable';
import PageWithSidebar from '../components/PageWithSidebar/PageWithSidebar';
import { Transaction } from './types';
import TransactionsSidebar from './components/TransactionsSidebar';
import transactions from './mocks/transactions';

interface TransactionsProps {}

const Transactions: FC<TransactionsProps> = memo(() => {
	const { t } = useTranslation();
	const { refetchTransactions, dateWiseTransactions } = useTransactions();
	const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);

	const onTransactionClick = useCallback(
		(transaction: Transaction) => {
			if (transaction.id === currentTransaction?.id) setCurrentTransaction(null);
			else setCurrentTransaction(transaction);
		},
		[currentTransaction?.id]
	);

	const onClose = useCallback(() => {
		setCurrentTransaction(null);
	}, []);

	useEffect(() => {
		refetchTransactions();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.transactionsContainer}>
			<PageWithSidebar
				header={
					<div className="transactions-header-component" data-testid="transactions-header-component">
						<h6 className={styles.pageTitle}>{t('transactions.title')}</h6>
					</div>
				}
				sidebarContent={currentTransaction && <TransactionsSidebar transaction={currentTransaction} />}
				sidebarLabel={t('transactions.transaction_details.title')}
				onClose={onClose}
			>
				{transactions?.length ? (
					<TransactionTable
						dateWiseTransactions={dateWiseTransactions}
						onTransactionClick={onTransactionClick}
						currentTransaction={currentTransaction}
					/>
				) : (
					<EmptyTransactions />
				)}
			</PageWithSidebar>
		</div>
	);
});

Transactions.defaultProps = {};

export default Transactions;
