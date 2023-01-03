import React from 'react';
import FsIconSvg from '../../../components/FsIcon/FsIconSvg';
import { cardModulePath } from '../constants';
import AddCard from './AddCard';
import ManageCards from './ManageCards';

const addCardFlowRedirectURL = `${cardModulePath}/manage-cards`;

const ManageCardsRoutes = {
	step: {
		title: 'User Type Selection',
		path: '/add-card/:step',
		element: <AddCard redirectURL={addCardFlowRedirectURL} />,
		requireAuth: true,
	},
	manageCards: {
		title: 'Manage Cards',
		path: '/',
		element: <ManageCards />,
		icon: FsIconSvg.card,
		requireAuth: true,
		isInSideMenu: true,
	},
};

export default ManageCardsRoutes;
