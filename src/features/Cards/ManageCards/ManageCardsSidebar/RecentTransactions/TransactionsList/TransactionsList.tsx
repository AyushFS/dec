import React from 'react';
import { ReactFCC } from '../../../../../../common/interface/react';
import Button, { ButtonSizes } from '../../../../../../components/Button';
import { useRequestGetTransactions } from '../../../../useRequest';
import { CardDetails, TransactionData } from '../../../interface';
import EmptyTransactionsBox from './EmptyTransactionsBox';
import styles from './TransactionsList.module.scss';
import TransactionsListItem from './TransactionsListItem';

interface TransactionsListProps {
	card: CardDetails;
}

const TransactionsList: ReactFCC<TransactionsListProps> = (props) => {
	const { card } = props;
	const params = {
		status: '',
		card_uuid: card.cardUuid,
		size: 5,
		order_by: 'created_at',
		order_descending: true,
	};
	const { isLoading, data } = useRequestGetTransactions({
		onSuccess: () => {},
		onError: (err: any) => {
			console.log('error', err);
		},
		params,
	});

	const transactions: TransactionData[] = data?.data || [];

	const containerProps = {
		className: styles.TransactionsList,
		'data-testid': 'transactions-list-component',
	};

	if (isLoading) {
		return <div {...containerProps}>Loading...</div>;
	}

	if (!transactions.length) {
		return (
			<div {...containerProps}>
				<EmptyTransactionsBox />
			</div>
		);
	}

	return (
		<div {...containerProps}>
			<div className={styles.TransactionsListItems}>
				{transactions.map((transaction: TransactionData) => {
					return <TransactionsListItem key={transaction.uuid} transaction={transaction} />;
				})}
			</div>
			<Button block size={ButtonSizes.small}>
				See all
			</Button>
		</div>
	);
};

export default TransactionsList;
