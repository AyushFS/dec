import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactFCC } from '../../../../../common/interface/react';
import styles from './EmptyTransactions.module.scss';
import EmptyTransactionsImage from '../../assets/empty-transactions.svg';
import Image from '../../../../../components/Image';

interface EmptyTransactionsProps {}

const EmptyTransactions: ReactFCC<EmptyTransactionsProps> = () => {
	const { t } = useTranslation();
	return (
		<div className={styles.emptyTransactions} data-testid="empty-transactions-component">
			<Image src={EmptyTransactionsImage} />
			<div className={styles.description}>{t('transactions.empty_transactions.description')}</div>
		</div>
	);
};

export default EmptyTransactions;
