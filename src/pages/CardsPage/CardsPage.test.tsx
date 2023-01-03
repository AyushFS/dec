import React from 'react';
import { screen, render } from '@testing-library/react';
import CardsPage from './CardsPage';

jest.mock('../../features/Cards/Cards', () => () => <div data-testid="cards" />);

describe('CardsPage Page component', () => {
	test('renders CardsPage page component', () => {
		render(<CardsPage />);
		expect(screen.getByTestId('cards-page')).toBeInTheDocument();
		expect(screen.getByTestId('cards')).toBeInTheDocument();
	});
});
