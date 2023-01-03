import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactFCC } from '../../../../../common/interface/react';
import useAuth from '../../../../Auth/useAuth';
import AvailableCashbackSmallBox from '../AvailableCashbackSmallBox';
import styles from './WelcomeBox.module.scss';

interface WelcomeBoxProps {}

const WelcomeBox: ReactFCC<WelcomeBoxProps> = () => {
	const { t } = useTranslation();
	const { auth } = useAuth();

	return (
		<div className={styles.WelcomeBox} data-testid="welcome-box-component">
			<div className={styles.greeting}>
				<span className={styles.welcome}>{t('overview.welcome_message.welcome_back')}</span>
				<span className={styles.name}>{auth?.first_name}</span>
			</div>
			<AvailableCashbackSmallBox />
		</div>
	);
};

export default WelcomeBox;
