import React from 'react';
import Transactions from '../Transactions/Transactions';
import { TransactionsProvider } from '../Transactions/TransactionsProvider';
import styles from './TransactionsPage.module.scss';

function TransactionsPage() {
	return (
		<TransactionsProvider>
			<div className={styles.transactionsPage} data-testid="transactions-page">
				<Transactions />
			</div>
		</TransactionsProvider>
	);
}

export default TransactionsPage;
