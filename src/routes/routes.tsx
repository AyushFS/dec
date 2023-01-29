import React from 'react';
import FsIconSvg from '../components/FsIcon/FsIconSvg';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import Login from '../pages/Login/Login';
import Logout from '../pages/Logout/Logout';
import { RouteConfig } from './interface';

const Routes: { [key: string]: RouteConfig } = {
	home: {
		title: 'Ruleset',
		path: '/ruleset',
		element: <DashboardPage />,
		icon: FsIconSvg.menu,
		requireAuth: false,
		isInSideMenu: true,
	},
	login: {
		title: 'Login',
		path: '/login',
		element: <Login />,
		requireAuth: false,
		isOnTopMenu: true,
	},
	logout: {
		title: 'Logout',
		path: '/logout',
		element: <Logout />,
		requireAuth: true,
		isOnTopMenu: false,
	},
};

export default Routes;
