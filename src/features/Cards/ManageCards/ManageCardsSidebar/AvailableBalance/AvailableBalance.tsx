import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactFCC } from '../../../../../common/interface/react';
import { useCurrencyFormat } from '../../../../../common/utilities/currencyFormat';
import Button from '../../../../../components/Button';
import FsIcon from '../../../../../components/FsIcon';
import { IconNames } from '../../../../../components/FsIcon/constants';
import useGlobalState from '../../../../GlobalState/useGlobalState';
import { CardDetails } from '../../interface';
import styles from './AvailableBalance.module.scss';

interface AvailableBalanceProps {
	card: CardDetails;
	onManageCardLimitClick?: () => void;
}

const AvailableBalance: ReactFCC<AvailableBalanceProps> = (props) => {
	const { t } = useTranslation();
	const { currentCountry } = useGlobalState();
	const { currencySymbolByCountry, formatCurrencyByCountry } = useCurrencyFormat(currentCountry);
	const { card, onManageCardLimitClick } = props;
	const barWidth = `${(Number(card.remainingLimit) * 100) / Number(card.totalLimit)}%`;

	return (
		<div className={styles.AvailableBalance} data-testid="available-balance-component">
			<div className={styles.AvailableBalanceHeader}>
				<span className={styles.AvailableBalanceHeaderTitle}>
					{t('manage_cards.card_details.available_balance')}
					<Button flat>
						<FsIcon>{IconNames['info-round']}</FsIcon>
					</Button>
				</span>
				<Button flat link onClick={onManageCardLimitClick}>
					{t('manage_cards.card_details.manage_limit')}
				</Button>
			</div>
			<div className={styles.AvailableBalanceAmount}>{formatCurrencyByCountry(card.outstandingLimit, false)}</div>
			<div className={styles.AvailableBalanceHeader}>
				<span className={styles.AvailableBalanceHeaderTitle}>{t('manage_cards.card_details.spending_limit')}</span>
			</div>
			<div className={styles.AvailableBalanceLimit}>
				<div className={styles.AvailableBalanceLimitBar}>
					<div
						className={styles.AvailableBalanceLimitBarProgress}
						style={{ width: barWidth }}
						data-testid="progress-bar"
					/>
				</div>
			</div>
			<div className={styles.AvailableBalanceSpendings}>
				<span className={styles.AvailableBalanceSpendingsAmount}>
					<span className={styles.AvailableBalanceSpendingsCurrency}>{currencySymbolByCountry} </span>
					{formatCurrencyByCountry(card.remainingLimit, false)}
				</span>
				<span className={styles.AvailableBalanceSpendingsSlash}>/</span>
				<span className={styles.AvailableBalanceSpendingsAmount}>
					<span className={styles.AvailableBalanceSpendingsCurrency}>{currencySymbolByCountry}</span>
					{formatCurrencyByCountry(card.totalLimit, false)}
				</span>
			</div>
		</div>
	);
};

export default AvailableBalance;
