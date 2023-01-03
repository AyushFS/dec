import React from 'react';
import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';

jest.mock('../../components/SidebarHeader', () => () => <div data-testid="sidebar-header-component" />);

describe('Sidebar component', () => {
	test('renders Sidebar component', () => {
		render(<Sidebar label="test" />);
		expect(screen.getByTestId('sidebar-component')).toBeInTheDocument();
		expect(screen.getByTestId('sidebar-header-component')).toBeInTheDocument();
	});

	test('should call onOverlayClick function when overlay is clicked', () => {
		const onOverlayClick = jest.fn();
		render(<Sidebar label="test" onOverlayClick={onOverlayClick} />);
		screen.getByTestId('sidebar-component--overlay').click();
		expect(onOverlayClick).toHaveBeenCalled();
	});

	test('should show content', () => {
		render(<Sidebar label="test">child content</Sidebar>);
		expect(screen.getByText('child content')).toBeInTheDocument();
	});
});
