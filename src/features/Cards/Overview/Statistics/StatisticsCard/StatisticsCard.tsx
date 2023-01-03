import React from 'react';
import { ReactFCC } from '../../../../../common/interface/react';
import styles from './StatisticsCard.module.scss';
import { useCurrencyFormat } from '../../../../../common/utilities/currencyFormat';
import useGlobalState from '../../../../GlobalState/useGlobalState';

interface StatisticsCardProps {
	title: React.ReactNode;
	amount: number;
	actions?: React.ReactNode;
	otherText?: React.ReactNode;
	chart?: React.ReactNode;
}

const StatisticsCard: ReactFCC<StatisticsCardProps> = (props) => {
	const { title, amount, actions, otherText, chart } = props;
	const { currentCountry } = useGlobalState();
	const { currencySymbolByCountry, formatCurrencyByCountry } = useCurrencyFormat(currentCountry);
	return (
		<div className={styles.StatisticsCard} data-testid="statistics-card-component">
			<div className={styles.body}>
				<div className={styles.content}>
					<div className={styles.title}>{title}</div>
					<div className={styles.price}>
						<div>
							<span className={styles.amount}>
								<span className={styles.currencyCode}>{currencySymbolByCountry}</span>
								<span data-testid="amount">{formatCurrencyByCountry(amount, false)}</span>
							</span>
						</div>
						<div>
							<span className={styles.otherText} data-testid="other-text">
								{otherText}
							</span>
						</div>
					</div>
				</div>
				<div className={styles.chart}>{chart}</div>
			</div>
			{actions && <div className={styles.actions}>{actions}</div>}
		</div>
	);
};

export default StatisticsCard;
