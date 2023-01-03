import React from 'react';
import { render, screen } from '@testing-library/react';
import PageWithSidebar from './PageWithSidebar';

jest.mock('../../../../components/StickyHeader', () => () => <div data-testid="sticky-header-component" />);
jest.mock('../Sidebar/Sidebar', () => () => <div data-testid="sidebar-component" />);

let mockIsMobile = false;
jest.mock('../../../GlobalState/useGlobalState', () => () => ({
	isMobile: mockIsMobile,
}));

describe('PageWithSidebar component', () => {
	beforeEach(() => {
		mockIsMobile = false;
	});

	test('renders PageWithSidebar component', () => {
		render(
			<PageWithSidebar>
				<div data-testid="page-with-sidebar-children" />
			</PageWithSidebar>
		);
		expect(screen.getByTestId('page-with-sidebar-component')).toBeInTheDocument();
		expect(screen.getByTestId('page-with-sidebar-children')).toBeInTheDocument();
	});

	test('renders PageWithSidebar component with header', () => {
		render(<PageWithSidebar header="header content" />);
		expect(screen.getByTestId('sticky-header-component')).toBeInTheDocument();
	});

	test('renders PageWithSidebar component with sidebar label and content', () => {
		render(<PageWithSidebar sidebarContent="sidebar content" />);
		expect(screen.getByTestId('sidebar-component')).toBeInTheDocument();
	});

	describe('container class', () => {
		test('should have container as class for main content container for non-mobile devices', () => {
			render(<PageWithSidebar />);
			expect(screen.getByTestId('container')).toHaveClass('container');
		});

		test('should have container-fluid as class for main content container for mobile devices', () => {
			mockIsMobile = true;
			render(<PageWithSidebar />);
			expect(screen.getByTestId('container')).toHaveClass('container-fluid');
		});
	});
});
