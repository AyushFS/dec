import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrencyFormat } from '../../../../../common/utilities/currencyFormat';
import useGlobalState from '../../../../GlobalState/useGlobalState';
import { Transaction } from '../../types';
import styles from './TransactionDetails.module.scss';
import CategoryImage from '../../assets/category.svg';
import Image from '../../../../../components/Image';
import { getShortDateAndTime } from '../../../../../common/utilities/dateTime';
import { maskCardNumber } from '../../../utils';
import transactionStatusConfig from './config';
import { getTransactionTypeLabel } from '../../utils';
import { defaultUserText } from '../../constants';

interface TransactionDetailsProps {
	transaction: Transaction;
}

const Field: FC<{ label: string; value: string; icon?: any }> = ({ label, value, icon }) => {
	return (
		<div className={styles.field}>
			<span className={styles.label}>{label}</span>
			<span className={styles.value}>
				{icon}
				{value}
			</span>
		</div>
	);
};
const TransactionDetails: FC<TransactionDetailsProps> = ({ transaction }) => {
	const { currentCountry } = useGlobalState();
	const { formatCurrencyByCountry } = useCurrencyFormat(currentCountry);
	const { t } = useTranslation();

	return (
		<div className={styles.transactionDetails} data-testid="transaction-details-component">
			<div className={styles.infoBoxContent}>
				<span className={styles.totalTransactionAmountLabel}>
					{t('transactions.transaction_details.total_transaction_amount')}
				</span>
				<div className={styles.totalTransactionAmount}>
					<span className={styles.currency}>{transaction.currency}</span>
					<span className={styles.amount}>{` ${formatCurrencyByCountry(transaction.amount, false)}`}</span>
				</div>
				<div className={styles.originalTransactionAmount}>
					<span className={styles.currency}>{transaction.originalCurrency}</span>
					<span className={styles.amount}>{` ${formatCurrencyByCountry(transaction.originalAmount, false)}`}</span>
				</div>
			</div>

			<div className={styles.fields}>
				<Field
					label={t('transactions.transaction_details.transaction_date')}
					value={getShortDateAndTime(new Date(transaction.createdAt))}
				/>
				<div className={styles.field}>
					<span className={styles.label}>{t('transactions.transaction_details.transaction_status')}</span>
					<span
						className={`${styles.transactionStatus} ${styles.value} ${
							transactionStatusConfig[transaction.transactionStatus]?.className
						}`}
					>
						{transaction.transactionStatus}
					</span>
				</div>
				<Field
					label={t('transactions.transaction_details.cardholder_detail')}
					value={`${transaction.cardHolderName || defaultUserText} (${maskCardNumber(transaction.maskedCardNumber)})`}
				/>
				<Field label={t('transactions.transaction_details.transaction_merchant')} value={transaction.merchantName} />
				<Field
					label={t('transactions.transaction_details.transaction_type')}
					value={getTransactionTypeLabel(transaction.transactionType)}
				/>
				<Field
					label={t('transactions.transaction_details.category')}
					icon={<Image src={CategoryImage} />}
					value={transaction.category}
				/>
			</div>
		</div>
	);
};

export default TransactionDetails;
