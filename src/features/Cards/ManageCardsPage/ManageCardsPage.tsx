import React from 'react';
import { Routes } from 'react-router-dom';
import createRoutes from '../../../common/utilities/createRoutes';
import { ManageCardsProvider } from '../ManageCards/ManageCardsProvider';
import ManageCardsRoutes from '../ManageCards/router';
import './ManageCardsPage.scss';

function ManageCardsPage() {
	return (
		<div className="manage-cards-page" data-testid="manage-cards-page">
			<ManageCardsProvider>
				<Routes>{createRoutes('/', ManageCardsRoutes || {}, true)}</Routes>
			</ManageCardsProvider>
		</div>
	);
}

export default ManageCardsPage;
