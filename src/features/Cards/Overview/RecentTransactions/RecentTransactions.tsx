import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as LockIcon } from '../../../../assets/images/icons/lock.svg';
import { ReactFCC } from '../../../../common/interface/react';
import FsIcon from '../../../../components/FsIcon';
import { IconTypes } from '../../../../components/FsIcon/constants';
import { cardModulePath } from '../../constants';
import EmptyTransactions from '../../Transactions/components/EmptyTransactions';
import TransactionTable from '../../Transactions/components/TransactionTable';
import { DateWiseTransactions } from '../../Transactions/types';
import { mapTransactionEntitiesToTransactions } from '../../Transactions/utils';
import { useRequestGetTransactions } from '../../useRequest';
import SectionHeader from '../SectionHeader';
import styles from './RecentTransactions.module.scss';

interface RecentTransactionsProps {}

const RecentTransactions: ReactFCC<RecentTransactionsProps> = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [dateWiseTransactions, setDateWiseTransactions] = useState<DateWiseTransactions>([]);

	const params = {
		status: '',
		size: 5,
		order_by: 'created_at',
		order_descending: true,
	};
	const { isLoading } = useRequestGetTransactions({
		onSuccess: (response) => {
			const { dateWiseTransactions: transformedDateWiseTransactions } = mapTransactionEntitiesToTransactions(
				response.data
			);
			setDateWiseTransactions(transformedDateWiseTransactions);
		},
		onError: () => {},
		params,
	});

	const containerProps = {
		className: styles.RecentTransactions,
		'data-testid': 'recent-transactions-component',
	};
	const onLinkClickHandler = () => {
		navigate(`${cardModulePath}/transactions`);
	};
	const Header = (
		<SectionHeader
			title={t('overview.recent_transactions.title')}
			linkText={t('overview.recent_transactions.view_all_transactions')}
			onLinkClick={onLinkClickHandler}
		/>
	);

	if (isLoading) {
		return (
			<div {...containerProps}>
				{Header}
				{t('common.loading')}
			</div>
		);
	}

	if (!dateWiseTransactions.length) {
		return (
			<div {...containerProps}>
				{Header}
				<EmptyTransactions />
			</div>
		);
	}

	return (
		<div {...containerProps}>
			{Header}
			<div className={styles.recentTransactionTable}>
				<TransactionTable
					dateWiseTransactions={dateWiseTransactions}
					onTransactionClick={() => {}}
					currentTransaction={null}
				/>
			</div>
			<div className={styles.secureTransactionNoteWrapper}>
				<div className={styles.secureTransactionNote}>
					<FsIcon type={IconTypes.svg} size={14}>
						<LockIcon />
					</FsIcon>
					<span>{t('overview.recent_transactions.transactions_are_secured')}</span>
				</div>
			</div>
		</div>
	);
};

export default RecentTransactions;
