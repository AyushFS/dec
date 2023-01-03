import React from 'react';
import { render, screen } from '@testing-library/react';
import SidebarHeader from './SidebarHeader';

const mockOnClose = jest.fn();

const renderComponent = () => render(<SidebarHeader onClose={mockOnClose} label="test" />);

describe('SidebarHeader component', () => {
	test('renders Sidebar component', () => {
		renderComponent();
		expect(screen.getByTestId('sidebar-header-component')).toBeInTheDocument();
	});

	test('renders close trigger', () => {
		renderComponent();
		expect(screen.getByRole('button')).toBeInTheDocument();
	});

	test('renders close trigger with arrow-left icon', () => {
		renderComponent();
		expect(screen.getByRole('button').children[0]).toHaveClass('fs-icon--cross');
	});

	test('renders title', () => {
		renderComponent();
		expect(screen.getByText('test')).toBeInTheDocument();
	});

	test('calls onClose when close trigger is clicked', () => {
		renderComponent();
		screen.getByRole('button').click();
		expect(mockOnClose).toHaveBeenCalled();
	});
});
