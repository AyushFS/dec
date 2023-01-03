import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { ResponsivePie } from '@nivo/pie';
import { ReactFCC } from '../../../../../common/interface/react';
import { ReactComponent as ArrowRight } from '../../../../../assets/images/icons/arrow-right.svg';
import Button from '../../../../../components/Button';
import FsIcon from '../../../../../components/FsIcon';
import { IconTypes } from '../../../../../components/FsIcon/constants';
import useGlobalState from '../../../../GlobalState/useGlobalState';
import { useCurrencyFormat } from '../../../../../common/utilities/currencyFormat';
import { DEVICE_TYPE } from '../../../../../common/constant/enum/GeneralEnum';
import useCards from '../../../UseCards';
import StatisticsCard from '../StatisticsCard';
import { needHigherLimitUrls } from './constants';
import styles from './TotalCreditBox.module.scss';

interface TotalCreditBoxProps {}

const TotalCreditBox: ReactFCC<TotalCreditBoxProps> = () => {
	const { t } = useTranslation();
	const { ccAppNeedHigherCreditLimit } = useFlags();
	const { cardsSummary, isLoadingCards } = useCards();
	const { currentCountry, deviceType } = useGlobalState();
	const { currencySymbolByCountry, formatCurrencyByCountry } = useCurrencyFormat(currentCountry);
	const [showDetails, setShowDetails] = useState(false);

	const onClickNeedHigherLimit = useCallback(() => {
		window.open((needHigherLimitUrls as any)[currentCountry], '_blank');
	}, [currentCountry]);

	const amount = isLoadingCards || !cardsSummary.remainingLimit ? 0 : parseFloat(cardsSummary.remainingLimit);
	const title = t('overview.total_credit_limit.total_credit_limit');
	const otherText =
		isLoadingCards || !cardsSummary.totalLimit
			? '/ 0.00'
			: `/ ${formatCurrencyByCountry(cardsSummary.totalLimit, false)}`;
	const popup = useMemo(
		() => (
			<div
				className={`${styles.popup} ${deviceType !== DEVICE_TYPE.MOBILE ? styles.floating : ''}`}
				data-testid="total-credit-box-popup"
			>
				<div className={styles.totalCreditSpent}>
					<div className={styles.title}>{t('overview.total_credit_limit.total_credit_spend')}</div>
					<div className={styles.amount}>
						<span className={styles.curencyCode}>{currencySymbolByCountry}</span>
						<span>{formatCurrencyByCountry(cardsSummary.outstandingLimit, false)}</span>
					</div>
				</div>
				<div className={styles.creditData}>
					{deviceType !== DEVICE_TYPE.MOBILE && (
						<>
							<div className={styles.creditDataRow}>
								<div className={styles.label}>{t('overview.total_credit_limit.total_available_credit')}</div>
								<div className={styles.amount}>
									<span className={styles.curencyCode}>{currencySymbolByCountry}</span>
									<span>{formatCurrencyByCountry(cardsSummary.remainingLimit, false)}</span>
								</div>
							</div>
							<div className={styles.divider} />
							<div className={styles.creditDataRow}>
								<div className={styles.label}>{t('overview.total_credit_limit.total_credit_limit')}</div>
								<div className={styles.amount}>
									<span className={styles.curencyCode}>{currencySymbolByCountry}</span>
									<span>{formatCurrencyByCountry(cardsSummary.totalLimit, false)}</span>
								</div>
							</div>
						</>
					)}
					{ccAppNeedHigherCreditLimit && (
						<div className={`${styles.creditDataRow} ${styles.label}`}>
							<Button link onClick={onClickNeedHigherLimit} testId="need-higher-limit-btn">
								{t('overview.total_credit_limit.need_higher_limit')}
							</Button>
						</div>
					)}
				</div>
			</div>
		),
		[
			cardsSummary,
			currencySymbolByCountry,
			deviceType,
			formatCurrencyByCountry,
			onClickNeedHigherLimit,
			t,
			ccAppNeedHigherCreditLimit,
		]
	);

	const actions = useMemo(
		() => (
			<div className={styles.actions}>
				<Button link flat onClick={() => setShowDetails(!showDetails)} testId="show-hide-details-btn">
					{deviceType === DEVICE_TYPE.MOBILE
						? t(`overview.total_credit_limit.${!showDetails ? 'show_limit_details' : 'hide_limit_details'}`)
						: t(`overview.total_credit_limit.${!showDetails ? 'show_details' : 'hide_details'}`)}
					<span className={showDetails ? styles.openCaret : ''}>
						<FsIcon right size={8} type={IconTypes.svg}>
							<ArrowRight />
						</FsIcon>
					</span>
				</Button>
				{showDetails && popup}
			</div>
		),
		[deviceType, popup, showDetails, t]
	);
	const chart = useMemo(
		() => (
			<div className={styles.pieChart}>
				<ResponsivePie
					data={[
						{
							id: '1',
							label: 'Remaining Limit',
							value: parseFloat(cardsSummary.outstandingLimit) || 100,
						},
						{
							id: '2',
							label: 'Spent Limit',
							value: parseFloat(cardsSummary.totalLimit) - parseFloat(cardsSummary.outstandingLimit) || 0,
						},
					]}
					colors={['transparent', '#08C0A6']}
					innerRadius={0.3}
					activeOuterRadiusOffset={8}
					borderWidth={1}
					margin={{ top: 2, right: 2, bottom: 2, left: 2 }}
					borderColor="#08C0A6"
					enableArcLabels={false}
					enableArcLinkLabels={false}
					isInteractive={false}
				/>
			</div>
		),
		[cardsSummary.outstandingLimit, cardsSummary.totalLimit]
	);

	return (
		<div className={styles.TotalCreditBox} data-testid="total-credit-box-component">
			<StatisticsCard title={title} amount={amount} actions={actions} otherText={otherText} chart={chart} />
		</div>
	);
};

export default TotalCreditBox;
