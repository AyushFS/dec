import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Cashback from './Cashback';

describe('Cashback Page component', () => {
	test('renders Cashback page component', () => {
		render(
			<BrowserRouter>
				<Cashback />
			</BrowserRouter>
		);
		expect(screen.getByTestId('cashback-page')).toBeInTheDocument();
	});
});
