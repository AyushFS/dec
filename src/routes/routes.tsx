import React from 'react';
import FsIconSvg from '../components/FsIcon/FsIconSvg';
// import { cardModulePath } from '../features/Cards/constants';
// import CardRoutes from '../features/Cards/router';
// import CardsPage from '../pages/CardsPage/CardsPage';
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import Login from '../pages/Login/Login';
// import Logout from '../pages/Logout/Logout';
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
	// cards: {
	// 	title: 'Cards',
	// 	path: cardModulePath,
	// 	element: <CardsPage />,
	// 	icon: FsIconSvg.card,
	// 	requireAuth: false,
	// 	isInSideMenu: true,
	// 	children: CardRoutes,
	// },
	// account: {
	// 	title: 'Account',
	// 	path: '/account',
	// 	element: <div>Account</div>,
	// 	icon: FsIconSvg.menu,
	// 	requireAuth: false,
	// 	isInSideMenuFooter: true,
	// },
	// settings: {
	// 	title: 'Settings',
	// 	path: '/settings',
	// 	element: <div>Settings</div>,
	// 	icon: FsIconSvg.settings,
	// 	requireAuth: true,
	// 	isInSideMenuFooter: true,
	// },
	login: {
		title: 'Login',
		path: '/login',
		element: <Login />,
		requireAuth: false,
		isOnTopMenu: true,
	},
	// logout: {
	// 	title: 'Logout',
	// 	path: '/logout',
	// 	element: <Logout />,
	// 	requireAuth: true,
	// 	icon: FsIconSvg.settings,
	// 	isInSideMenuFooter: true,
	// 	isOnTopMenu: true,
	// },
};

export default Routes;
