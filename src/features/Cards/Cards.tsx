import React from 'react';
import { Routes } from 'react-router-dom';
import createRoutes from '../../common/utilities/createRoutes';
import CardRoutes from './router';
import { CardsProvider } from './CardsProvider';

function Cards() {
	return (
		<div data-testid="cards-component">
			<CardsProvider>
				<Routes>{createRoutes('/', CardRoutes || {})}</Routes>
			</CardsProvider>
		</div>
	);
}

export default Cards;
