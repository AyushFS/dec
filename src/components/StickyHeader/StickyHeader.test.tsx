import React from 'react';
import { render, screen } from '@testing-library/react';
import StickyHeader from './StickyHeader';

describe('StickyHeader component', () => {
	test('renders StickyHeader component', () => {
		render(<StickyHeader />);
		const StickyHeaderElement = screen.getByTestId('sticky-header-component');
		expect(StickyHeaderElement).toBeInTheDocument();
	});
});
