import React from 'react';
import { render, screen } from '@testing-library/react';
import ManageCardsHeader from './ManageCardsHeader';

describe('ManageCardsHeader component', () => {
	test('renders ManageCardsHeader component', () => {
		render(<ManageCardsHeader />);
		expect(screen.getByTestId('manage-cards-header-component')).toBeInTheDocument();
	});
});
