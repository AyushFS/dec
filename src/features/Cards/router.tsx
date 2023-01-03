import React from 'react';
import FsIconSvg from '../../components/FsIcon/FsIconSvg';
import Overview from './Overview';
import StatementsPage from './StatementsPage';
import ManageCardsPage from './ManageCardsPage';
import Cashback from './Cashback';
import TransactionsPage from './TransactionsPage';

const CardRoutes = {
	cards: {
		title: 'Overview',
		path: '/',
		element: <Overview />,
		icon: FsIconSvg.grid,
		requireAuth: false,
	},
	overview: {
		title: 'Overview',
		path: '/overview',
		element: <Overview />,
		icon: FsIconSvg.grid,
		requireAuth: false,
		isInSideMenu: true,
	},
	transactions: {
		title: 'Transactions',
		path: '/transactions',
		element: <TransactionsPage />,
		icon: FsIconSvg.transactionLined,
		requireAuth: false,
		isInSideMenu: true,
	},
	manageCards: {
		title: 'Manage Cards',
		path: '/manage-cards',
		element: <ManageCardsPage />,
		icon: FsIconSvg.card,
		requireAuth: true,
		isInSideMenu: true,
	},
	statement: {
		title: 'Statement',
		path: '/statement',
		element: <StatementsPage />,
		icon: FsIconSvg.statementLined,
		requireAuth: false,
		isInSideMenu: true,
	},
	cashback: {
		title: 'Cashback',
		path: '/cashback',
		element: <Cashback />,
		requireAuth: true,
		icon: FsIconSvg.cashback,
		isInSideMenu: true,
	},
};

export default CardRoutes;
