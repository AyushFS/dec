import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ReactFCC } from '../../../../common/interface/react';
import InfoBox from '../../../../components/InfoBox';
import useGlobalState from '../../../GlobalState/useGlobalState';
import { DEVICE_TYPE } from '../../../../common/constant/enum/GeneralEnum';
import useCards from '../../UseCards';
import { getWarningMessage } from '../../Statements/components/DueAmountAlertBox/utils';
import { WarningMessage } from '../../Statements/components/DueAmountAlertBox/interface';
import { cardModulePath } from '../../constants';
import DueAmountBox from './DueAmountBox';
import AvailableCashbackBox from './AvailableCashbackBox';
import TotalCreditBox from './TotalCreditBox';
import styles from './Statistics.module.scss';

interface StatisticsProps {}

const Statistics: ReactFCC<StatisticsProps> = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { deviceType } = useGlobalState();
	const [sections, setSections] = useState<React.ReactNode[]>([]);
	const {
		getStatementsBillQuery: { refetch: refetchBill },
		bill,
	} = useCards();
	const showBill = parseFloat(bill?.totalOutstanding || '0') > 0;
	const warningMessage: WarningMessage | null = Object.keys(bill).length ? getWarningMessage(bill) : null;

	const showPayBillSection = useCallback(() => {
		navigate(`${cardModulePath}/statement/pay-bill`);
	}, [navigate]);
	const showBillDetailsSection = useCallback(() => {
		navigate(`${cardModulePath}/statement/view-bill`);
	}, [navigate]);
	const onViewCashbackClick = useCallback(() => {
		navigate(`${cardModulePath}/cashback`);
	}, [navigate]);

	useEffect(() => {
		if (!bill || !Object.values(bill).length) {
			refetchBill();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const sectionsList = [];
		sectionsList.push(<TotalCreditBox />);
		if (showBill) {
			sectionsList.push(
				<>
					<DueAmountBox bill={bill} onPayBillClick={showPayBillSection} onViewDetailsClick={showBillDetailsSection} />
					{warningMessage && (
						<div className={styles.dueAmountWarning}>
							<InfoBox type={warningMessage.theme as any} size="small" borderless iconSize={16}>
								{t(warningMessage.message)}
							</InfoBox>
						</div>
					)}
				</>
			);
		}
		if (![DEVICE_TYPE.MOBILE, DEVICE_TYPE.TABLET].includes(deviceType)) {
			sectionsList.push(<AvailableCashbackBox onViewCashbackClick={onViewCashbackClick} />);
		}
		setSections(sectionsList);
	}, [showBill, bill, warningMessage, t, showPayBillSection, showBillDetailsSection, onViewCashbackClick, deviceType]);

	return (
		<div className={styles.statistics} data-testid="statistics-component">
			<div className={styles.statisticsWrapper}>
				{sections.map((section, index) => (
					// eslint-disable-next-line react/no-array-index-key
					<React.Fragment key={index}>
						<div className={styles.section}>{section}</div>
						{index !== sections.length - 1 && (
							<div className={styles.noSpace}>
								<div className={styles.verticalLine} />
							</div>
						)}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default Statistics;
