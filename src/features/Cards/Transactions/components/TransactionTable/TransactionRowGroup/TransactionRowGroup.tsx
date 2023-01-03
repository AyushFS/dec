import React, { memo, FC } from 'react';
import styles from './TransactionRowGroup.module.scss';
import TransactionRow from '../TransactionRow';
import { DateWiseTransaction, Transaction } from '../../../types';

interface TransactionRowGroupProps {
	dateWiseTransaction: DateWiseTransaction;
	onTransactionClick: (transaction: Transaction) => void;
	currentTransaction: Transaction | null;
}

const TransactionRowGroup: FC<TransactionRowGroupProps> = memo(
	({ dateWiseTransaction, currentTransaction, onTransactionClick }) => {
		return (
			<div className={styles.transactionRowGroup} data-testid="transaction-row-group-component">
				<div className={styles.rowHeader}>{dateWiseTransaction.date}</div>
				{dateWiseTransaction?.data?.length &&
					dateWiseTransaction.data.map((transactionItem) => (
						<TransactionRow
							key={transactionItem.id}
							transaction={transactionItem}
							onTransactionClick={onTransactionClick}
							selected={!!(currentTransaction && currentTransaction.id === transactionItem.id)}
						/>
					))}
			</div>
		);
	}
);

TransactionRowGroup.defaultProps = {};

export default TransactionRowGroup;
