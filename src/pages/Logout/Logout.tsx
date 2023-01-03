import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useAnalytics from '../../features/Analytics/useAnalytics';
import MixpanelEvent from '../../features/Analytics/constants';
import useAuth from '../../features/Auth/useAuth';
import { logout } from '../../features/Auth/Auth.service';

function Logout() {
	const { t } = useTranslation();
	const { trackEvent } = useAnalytics();
	const { setAuth } = useAuth();
	useEffect(() => {
		const processLogout = () => {
			try {
				logout();
				setAuth(null);
				trackEvent(MixpanelEvent.APP_LOGOUT, {});
			} catch (e) {
				console.error(e);
			}
		};
		processLogout();
		// eslint-disable-next-line
	}, [setAuth]);
	return (
		<div className="Logout-page text-center m-8" data-testid="logout-page">
			{t('logout.logging_out')}
		</div>
	);
}

export default Logout;
