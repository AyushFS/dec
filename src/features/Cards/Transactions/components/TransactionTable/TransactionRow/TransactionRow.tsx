import React, { memo, FC, useCallback } from 'react';
import { useCurrencyFormat } from '../../../../../../common/utilities/currencyFormat';
import Button from '../../../../../../components/Button';
import FsIcon from '../../../../../../components/FsIcon';
import { IconTypes } from '../../../../../../components/FsIcon/constants';
import useGlobalState from '../../../../../GlobalState/useGlobalState';
import styles from './TransactionRow.module.scss';
import CategoryImage from '../../../assets/category.svg';
import Image from '../../../../../../components/Image';
import { Transaction } from '../../../types';
import { getShortDateMonth } from '../../../../../../common/utilities/dateTime';
import { maskCardNumber } from '../../../../utils';
import { TRANSACTION_TYPE } from '../../../../../../common/constant/enum/GeneralEnum';
import { defaultUserText } from '../../../constants';

interface TransactionRowProps {
	transaction: Transaction;
	selected: boolean;
	onTransactionClick: (transaction: Transaction) => void;
}

const TransactionRow: FC<TransactionRowProps> = memo(({ transaction, selected, onTransactionClick }) => {
	const { currentCountry } = useGlobalState();
	const { formatCurrencyByCountry } = useCurrencyFormat(currentCountry);

	const onClick = useCallback(() => {
		if (onTransactionClick) onTransactionClick(transaction);
	}, [onTransactionClick, transaction]);

	const transactionAmountMultiplier = transaction.transactionType === TRANSACTION_TYPE.DEBIT ? -1 : 1;

	return (
		<div
			className={`${styles.transactionRow} ${selected ? styles.selected : ''}`}
			onClick={onClick}
			data-testid="transaction-row-component"
		>
			<div className={styles.categoryWrapper}>
				<span className={styles.merchantName}>{transaction.merchantName}</span>
				<div className={styles.categoryTypeWrapper}>
					<span>{getShortDateMonth(new Date(transaction.createdAt))}</span>
					<div>
						<Image src={CategoryImage} />
						{transaction.category}
					</div>
				</div>
			</div>
			<div className={styles.cardHolderDetails}>
				<span className={styles.cardHolderName}>{transaction.cardHolderName || defaultUserText}</span>
				<span className={styles.maskedCardNumber}>({maskCardNumber(transaction.maskedCardNumber)})</span>
			</div>
			<div className={`${styles.amountDetails} ${transactionAmountMultiplier === 1 ? styles.creditTransaction : ''}`}>
				<span>{`${transaction.currency} ${formatCurrencyByCountry(
					parseFloat(transaction.amount) * transactionAmountMultiplier,
					false
				)}`}</span>
				<Button flat>
					<FsIcon size={24} type={IconTypes.icon}>
						arrow-right
					</FsIcon>
				</Button>
			</div>
		</div>
	);
});

TransactionRow.defaultProps = {};

export default TransactionRow;
