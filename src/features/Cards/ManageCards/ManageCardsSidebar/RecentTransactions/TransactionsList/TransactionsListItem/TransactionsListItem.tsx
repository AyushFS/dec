import React from 'react';
import { ReactFCC } from '../../../../../../../common/interface/react';
import { formatCurrency, getShortDate } from '../../../../../../../common/utilities/validationChecker/Utils';
import FsIcon from '../../../../../../../components/FsIcon';
import { IconNames } from '../../../../../../../components/FsIcon/constants';
import { TransactionData } from '../../../../interface';
import styles from './TransactionsListItem.module.scss';

interface TransactionsListItemProps {
	transaction: TransactionData;
}

const TransactionsListItem: ReactFCC<TransactionsListItemProps> = (props) => {
	const { transaction } = props;
	return (
		<div className={styles.TransactionsListItem} data-testid="transactions-list-item-component">
			<div className={styles.TransactionsListItemRow}>
				<div className={styles.TransactionsListItemName}>
					{transaction.payload?.transaction?.merchant_details?.name}
				</div>
				<div className={styles.TransactionsListItemAmount}>
					<span className={styles.TransactionsListItemCurrency}>{transaction.currency}</span>
					{` ${formatCurrency(transaction.amount * -1)}`}
				</div>
			</div>
			<div className={styles.TransactionsListItemRow}>
				<div className={styles.TransactionsListItemDate}>{getShortDate(new Date(transaction.createdAt))}</div>
				<div className={styles.TransactionsListItemCategory}>
					<span className={styles.TransactionsListItemCategoryIcon}>
						<FsIcon size={12}>{IconNames.tag}</FsIcon>
					</span>
					{transaction.category}
				</div>
			</div>
		</div>
	);
};

export default TransactionsListItem;
