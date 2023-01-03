import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactFCC } from '../../../../../common/interface/react';
import { useCurrencyFormat } from '../../../../../common/utilities/currencyFormat';
import { ReactComponent as CashbackMoneyImage } from '../../../../../assets/images/statistic-cards/dollar.svg';
import FsIcon from '../../../../../components/FsIcon';
import { IconTypes } from '../../../../../components/FsIcon/constants';
import useGlobalState from '../../../../GlobalState/useGlobalState';
import useCards from '../../../UseCards';
import styles from './AvailableCashbackSmallBox.module.scss';

interface AvailableCashbackSmallBoxProps {}

const AvailableCashbackSmallBox: ReactFCC<AvailableCashbackSmallBoxProps> = () => {
	const { currentCountry } = useGlobalState();
	const { t } = useTranslation();
	const { currencySymbolByCountry, formatCurrencyByCountry } = useCurrencyFormat(currentCountry);
	const {
		getTotalCashbackEarnedQuery: { isLoading, refetch },
		totalCashbackEarned,
	} = useCards();

	useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.AvailableCashbackSmallBox} data-testid="available-cashback-small-box-component">
			<div className={styles.cashbackAmount}>
				<div className={styles.cashbackTitle}>{t('overview.available_cashback_small.title')}</div>
				<div className={styles.cashbackCurrency}>
					{isLoading ? (
						<div>{t('common.loading')}</div>
					) : (
						<>
							<span className={styles.currencyCode}>{currencySymbolByCountry}</span>
							<span>{formatCurrencyByCountry(totalCashbackEarned, false)}</span>
						</>
					)}
				</div>
			</div>
			<div className={styles.cashbackImage}>
				<FsIcon type={IconTypes.svg} size={24}>
					<CashbackMoneyImage />
				</FsIcon>
			</div>
		</div>
	);
};

export default AvailableCashbackSmallBox;
