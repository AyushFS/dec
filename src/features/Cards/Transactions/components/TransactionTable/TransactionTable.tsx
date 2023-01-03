import React, { memo, FC } from 'react';
import { DateWiseTransactions, Transaction } from '../../types';
import TransactionRowGroup from './TransactionRowGroup';
import styles from './TransactionTable.module.scss';

interface TransactionTableProps {
	dateWiseTransactions: DateWiseTransactions;
	onTransactionClick: (transaction: Transaction) => void;
	currentTransaction: Transaction | null;
}

const TransactionTable: FC<TransactionTableProps> = memo(
	({ dateWiseTransactions, currentTransaction, onTransactionClick }) => {
		return (
			<div className={styles.transactionTable} data-testid="transaction-table-component">
				<div className={styles.transactionRowGroups}>
					{dateWiseTransactions.map((dateWiseTransaction) => {
						return (
							<TransactionRowGroup
								onTransactionClick={onTransactionClick}
								dateWiseTransaction={dateWiseTransaction}
								currentTransaction={currentTransaction}
							/>
						);
					})}
				</div>
			</div>
		);
	}
);

TransactionTable.defaultProps = {};

export default TransactionTable;
