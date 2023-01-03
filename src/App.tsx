import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { withLDConsumer } from 'launchdarkly-react-client-sdk';
import RoutesConfig from './routes';
import Layout from './layout/Layout';

import useMonitoring from './features/Monitoring/useMonitoring';
import Tooltip from './components/Tooltip/Tooltip';
import Snackbar from './components/Snackbar';
import useGlobalState from './features/GlobalState/useGlobalState';
import createRoutes from './common/utilities/createRoutes';

function App() {
	const { t } = useTranslation();

	const location = useLocation();
	const history = useNavigate();
	const { snackbar, setSnackbar } = useGlobalState();
	const { initDatadog } = useMonitoring();

	initDatadog();

	const onSnackbarDismiss = () => {
		if (snackbar?.onSnackbarDismiss) {
			snackbar.onSnackbarDismiss();
		}
		setSnackbar(null);
	};

	useEffect(() => {
		if (location.pathname === '/') {
			history('/ruleset');
		}
	}, [history, location.pathname]);

	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					{createRoutes('/', RoutesConfig)}
					{/* catch all */}
					<Route path="*" element={<h1>{t('http_errors.404')}</h1>} />
				</Route>
			</Routes>
			<Tooltip />
			{snackbar && <Snackbar {...{ ...snackbar, onSnackbarDismiss }} />}
		</>
	);
}

export default withLDConsumer()(App);