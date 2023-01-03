import React from 'react';
import { DEVICE_TYPE } from '../../../common/constant/enum/GeneralEnum';
import useGlobalState from '../../GlobalState/useGlobalState';
import WelcomeBox from './Statistics/WelcomeBox';
import Statistics from './Statistics';
import MyCards from './MyCards';
import QuickActions from './QuickActions';
import RewardsAndBenefits from './RewardsAndBenefits';
import styles from './Overview.module.scss';
import RecentTransactions from './RecentTransactions';

function Overview() {
	const { deviceType } = useGlobalState();

	return (
		<div className={styles.overview} data-testid="overview-component">
			<div className={styles.container}>
				<div className={styles.row}>
					<div className={styles.col}>
						{[DEVICE_TYPE.MOBILE, DEVICE_TYPE.TABLET].includes(deviceType) && (
							<div className={styles.welcome}>
								<WelcomeBox />
							</div>
						)}
						<div className={styles.section}>
							<Statistics />
						</div>
					</div>
				</div>
				<div className={styles.row}>
					<div className={styles.col}>
						<div className={styles.section}>
							<MyCards />
							<QuickActions />
						</div>
					</div>
				</div>
				<div className={styles.row}>
					<div className={styles.col}>
						<div className={`${styles.section} ${styles.isColumn}`}>
							<RecentTransactions />
						</div>
					</div>
				</div>
				<div className={styles.row}>
					<div className={styles.col}>
						<div className={`${styles.section} ${styles.isColumn}`}>
							<RewardsAndBenefits />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Overview;
