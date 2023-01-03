import React, { useEffect } from 'react';
import { Routes, useLocation } from 'react-router-dom';
import { DashboardProvider } from './DashboardProvider';
import DashboardRoutes from './router';
import createRoutes from '../../common/utilities/createRoutes';
import useGlobalState from '../GlobalState/useGlobalState';

function Dashboard() {
	const location = useLocation();
	const { setDrawerOpen } = useGlobalState();

	useEffect(() => {
		setDrawerOpen((prev) => ({ ...prev, rule: false }));
	}, [location, setDrawerOpen]);

	return (
		<div data-testid="Dashboard-component">
			<DashboardProvider>
				<Routes>{createRoutes('/', DashboardRoutes || {})}</Routes>
			</DashboardProvider>
		</div>
	);
}

export default Dashboard;
