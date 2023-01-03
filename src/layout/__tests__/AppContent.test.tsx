import React from 'react';
import { render, screen } from '@testing-library/react';
import AppContent from '../AppContent/AppContent';

jest.mock('../../components/Header', () => () => <div data-testid="header" />);

describe('AppContent component', () => {
	it('should render AppContent component', () => {
		const attrs = {
			isDrawerOpen: true,
			visibleNavBar: false,
			fixedDrawer: false,
		};
		render(<AppContent {...attrs} />);
		expect(screen.getByTestId('app-content')).toBeInTheDocument();
		expect(screen.getByTestId('header')).toBeInTheDocument();
	});

	describe('sidebarWidth', () => {
		it('should use default value for sidebarWidth', () => {
			const attrs = {
				isDrawerOpen: true,
				visibleNavBar: false,
				fixedDrawer: false,
			};
			render(<AppContent {...attrs} />);
			expect(screen.getByTestId('app-content')).toHaveStyle('margin-left: 240px');
		});

		it('should use custom value for sidebarWidth', () => {
			const attrs = {
				isDrawerOpen: true,
				visibleNavBar: false,
				fixedDrawer: false,
				sidebarWidth: 300,
			};
			render(<AppContent {...attrs} />);
			expect(screen.getByTestId('app-content')).toHaveStyle('margin-left: 300px');
		});
	});

	describe('getAppContentMarginLeft', () => {
		describe('when fixedDrawer is true', () => {
			[
				{ visibleNavBar: true, isDrawerOpen: true },
				{ visibleNavBar: false, isDrawerOpen: true },
				{ visibleNavBar: true, isDrawerOpen: false },
				{ visibleNavBar: false, isDrawerOpen: false },
			].forEach((attrs) => {
				it(`should return 0 when visibleNavBar is ${attrs.visibleNavBar} and isDrawerOpen is ${attrs.isDrawerOpen}`, () => {
					const { isDrawerOpen, visibleNavBar } = attrs;
					const fixedDrawer = true;
					const attributes = {
						isDrawerOpen,
						visibleNavBar,
						fixedDrawer,
					};
					render(<AppContent {...attributes} />);
					expect(screen.getByTestId('app-content')).toHaveStyle('margin-left: 0px');
				});
			});
		});
		describe('when fixedDrawer is false', () => {
			[
				{ visibleNavBar: true, isDrawerOpen: true, expected: '0px' },
				{ visibleNavBar: true, isDrawerOpen: false, expected: '0px' },
				{ visibleNavBar: false, isDrawerOpen: true, expected: '240px' },
				{ visibleNavBar: false, isDrawerOpen: false, expected: '0px' },
			].forEach((attrs) => {
				it(`should return 0 when visibleNavBar is ${attrs.visibleNavBar} and isDrawerOpen is ${attrs.isDrawerOpen}`, () => {
					const { isDrawerOpen, visibleNavBar, expected } = attrs;
					const fixedDrawer = false;
					const attributes = {
						isDrawerOpen,
						visibleNavBar,
						fixedDrawer,
					};
					render(<AppContent {...attributes} />);
					expect(screen.getByTestId('app-content')).toHaveStyle(`margin-left: ${expected}`);
				});
			});
		});
	});

	describe('getMainMarginLeft', () => {
		describe('when fixedDrawer is true', () => {
			[
				{ visibleNavBar: true, isDrawerOpen: true },
				{ visibleNavBar: false, isDrawerOpen: true },
				{ visibleNavBar: true, isDrawerOpen: false },
				{ visibleNavBar: false, isDrawerOpen: false },
			].forEach((attrs) => {
				it(`should return 0 when visibleNavBar is ${attrs.visibleNavBar} and isDrawerOpen is ${attrs.isDrawerOpen}`, () => {
					const { isDrawerOpen, visibleNavBar } = attrs;
					const fixedDrawer = true;
					const attributes = {
						isDrawerOpen,
						visibleNavBar,
						fixedDrawer,
					};
					render(<AppContent {...attributes} />);
					expect(screen.getByTestId('main')).toHaveStyle('margin-left: 0px');
				});
			});
		});

		describe('when fixedDrawer is false', () => {
			[
				{ visibleNavBar: true, isDrawerOpen: true, expected: '240px' },
				{ visibleNavBar: true, isDrawerOpen: false, expected: '0px' },
				{ visibleNavBar: false, isDrawerOpen: true, expected: '0px' },
				{ visibleNavBar: false, isDrawerOpen: false, expected: '0px' },
			].forEach((attrs) => {
				it(`should return 0 when visibleNavBar is ${attrs.visibleNavBar} and isDrawerOpen is ${attrs.isDrawerOpen}`, () => {
					const { isDrawerOpen, visibleNavBar, expected } = attrs;
					const fixedDrawer = false;
					const attributes = {
						isDrawerOpen,
						visibleNavBar,
						fixedDrawer,
					};
					render(<AppContent {...attributes} />);
					expect(screen.getByTestId('main')).toHaveStyle(`margin-left: ${expected}`);
				});
			});
		});
	});
});
