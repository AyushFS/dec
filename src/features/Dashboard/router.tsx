import React from 'react';
import FsIconSvg from '../../components/FsIcon/FsIconSvg';
import DashboardContainer from './components/DashboardContainer/DashboardContainer';
import RulesetDetails from './components/RulesetDetails/RulesetDetails';

const DashboardRoutes = {
	home: {
		title: 'Ruleset',
		path: '/',
		element: <DashboardContainer />,
		icon: FsIconSvg.grid,
		requireAuth: false,
	},
	rule: {
		title: 'Ruleset',
		path: '/rule',
		element: <RulesetDetails />,
		icon: FsIconSvg.grid,
		requireAuth: false,
		isInSideMenu: false,
	},
};

export default DashboardRoutes;
