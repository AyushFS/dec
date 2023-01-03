import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactFCC } from '../../../../../common/interface/react';
import { ReactComponent as ArrowRight } from '../../../../../assets/images/icons/arrow-right.svg';
import cashbackMoneyImage from '../../../../../assets/images/statistic-cards/cashback-money.svg';
import Button from '../../../../../components/Button';
import FsIcon from '../../../../../components/FsIcon';
import { IconTypes } from '../../../../../components/FsIcon/constants';
import useGlobalState from '../../../../GlobalState/useGlobalState';
import { useCurrencyFormat } from '../../../../../common/utilities/currencyFormat';
import StatisticsCard from '../StatisticsCard';
import styles from './AvailableCashbackBox.module.scss';
import Image from '../../../../../components/Image';
import useCards from '../../../UseCards';

interface AvailableCashbackBoxProps {
	onViewCashbackClick: () => void;
}

const AvailableCashbackBox: ReactFCC<AvailableCashbackBoxProps> = ({ onViewCashbackClick }) => {
	const { t } = useTranslation();
	const { currentCountry } = useGlobalState();
	const { formatCurrencyByCountry } = useCurrencyFormat(currentCountry);
	const {
		getTotalCashbackEarnedQuery: { refetch: refetchTotalCashbackEarned, isLoading: isLoadingTotalCashbackEarned },
		getCashbackDetailsQuery: { refetch: refetchCashbackDetails },
		totalCashbackEarned,
		cashbackDetails,
	} = useCards();

	useEffect(() => {
		if (refetchTotalCashbackEarned) refetchTotalCashbackEarned();
		if (refetchCashbackDetails) refetchCashbackDetails();
	}, [refetchTotalCashbackEarned, refetchCashbackDetails]);

	const title = t('overview.available_cashback_small.title');
	const amount = cashbackDetails.currentRemainingBalance;
	const actions = (
		<Button link flat onClick={onViewCashbackClick}>
			{t('overview.available_cashback_small.view_cashback')}
			<FsIcon right size={8} type={IconTypes.svg}>
				<ArrowRight />
			</FsIcon>
		</Button>
	);
	const totalEarnedText = isLoadingTotalCashbackEarned
		? t('common.loading')
		: `${t('overview.available_cashback_small.total_earned')}: ${formatCurrencyByCountry(totalCashbackEarned, false)}`;

	return (
		<div className={styles.AvailableCashbackBox} data-testid="available-cashback-box-component">
			<StatisticsCard
				title={title}
				amount={amount}
				actions={actions}
				otherText={totalEarnedText}
				chart={<Image src={cashbackMoneyImage} />}
			/>
		</div>
	);
};

export default AvailableCashbackBox;
