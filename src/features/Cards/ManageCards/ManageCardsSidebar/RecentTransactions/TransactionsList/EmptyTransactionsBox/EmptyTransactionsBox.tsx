import React from 'react';
import { ReactFCC } from '../../../../../../../common/interface/react';
import Button from '../../../../../../../components/Button';
import EmptyTransactionsImage from './images/lady-with-laptop.svg';
import styles from './EmptyTransactionsBox.module.scss';

interface EmptyTransactionsBoxProps {}

const EmptyTransactionsBox: ReactFCC<EmptyTransactionsBoxProps> = () => {
	return (
		<div className={styles.EmptyTransactionsBox} data-testid="empty-transactions-component">
			<div className={styles.EmptyTransactionsBoxImage}>
				<img src={EmptyTransactionsImage} alt="Empty transactions" />
			</div>
			<div className={styles.EmptyTransactionsBoxContent}>
				<div className={styles.EmptyTransactionsBoxText}>
					Use your cards on online purchases, recurring payments and anywhere Mastercard® is accepted.
				</div>
				<Button flat link>
					Start spending
				</Button>
			</div>
		</div>
	);
};

export default EmptyTransactionsBox;
