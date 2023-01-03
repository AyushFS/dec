import React from 'react';
import { render, screen } from '@testing-library/react';
import SectionHeader from './SectionHeader';

const mockOnLinkClick = jest.fn();
describe('SectionHeader component', () => {
	test('renders SectionHeader component', () => {
		render(<SectionHeader title="title text" linkText="link text" onLinkClick={mockOnLinkClick} />);
		expect(screen.getByTestId('section-header-component')).toBeInTheDocument();
		expect(screen.getByText('title text')).toBeInTheDocument();
		expect(screen.getByText('link text')).toBeInTheDocument();
		screen.getByRole('button').click();
		expect(mockOnLinkClick).toHaveBeenCalled();
	});
});
