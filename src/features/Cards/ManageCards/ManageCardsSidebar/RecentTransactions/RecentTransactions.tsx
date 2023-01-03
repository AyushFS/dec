import React from 'react';
import { ReactFCC } from '../../../../../common/interface/react';
import Button from '../../../../../components/Button';
import { CardDetails } from '../../interface';
import styles from './RecentTransactions.module.scss';
import TransactionsList from './TransactionsList';

interface RecentTransactionsProps {
	card: CardDetails;
}

const RecentTransactions: ReactFCC<RecentTransactionsProps> = (props) => {
	const { card } = props;
	return (
		<div className={styles.RecentTransactions} data-testid="recent-transactions-component">
			<div className={styles.RecentTransactionsHeader}>
				<h5 className={styles.RecentTransactionsHeaderTitle}>Recent transactions</h5>
				<Button flat link>
					See all
				</Button>
			</div>
			<div className={styles.RecentTransactionsContent}>
				<TransactionsList card={card} />
			</div>
		</div>
	);
};

export default RecentTransactions;
