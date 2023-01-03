import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Drawer from '.';

const mockHideDrawer = jest.fn();
let mockIsMobile = false;
jest.mock('../../features/GlobalState/useGlobalState', () => ({
	__esModule: true,
	default: () => ({
		isMobile: mockIsMobile,
	}),
}));

describe('Drawer component', () => {
	it('should render Drawer component', () => {
		const attrs = {
			isDrawerOpen: true,
			hideDrawer: mockHideDrawer,
		};
		render(<Drawer {...attrs} />);
		expect(screen.getByTestId('drawer')).toBeInTheDocument();
	});

	describe('overlay', () => {
		const defaultAttrs = {
			hasOverlay: true,
			hideDrawer: mockHideDrawer,
		};

		it('should render overlay when isDrawerOpen is true', () => {
			const attrs = {
				isDrawerOpen: true,
				hasOverlay: true,
				hideDrawer: mockHideDrawer,
			};
			render(<Drawer {...attrs} />);
			expect(screen.getByTestId('drawer-overlay')).toBeInTheDocument();
		});
		it('should not render overlay when isDrawerOpen is false', () => {
			const attrs = {
				isDrawerOpen: false,
				hasOverlay: true,
				hideDrawer: mockHideDrawer,
			};
			render(<Drawer {...attrs} />);
			expect(screen.queryByTestId('drawer-overlay')).not.toBeInTheDocument();
		});
		it('should call hideDrawer when overlay is clicked', () => {
			const attrs = {
				...defaultAttrs,
				isDrawerOpen: true,
			};
			render(<Drawer {...attrs} />);
			userEvent.click(screen.getByTestId('drawer-overlay'));
			expect(mockHideDrawer).toHaveBeenCalled();
		});
		it('should have default opacity 0 when isDrawerOpen is false', () => {
			const attrs = {
				...defaultAttrs,
				isDrawerOpen: true,
			};
			render(<Drawer {...attrs} />);
			expect(screen.getByTestId('drawer-overlay')).toHaveStyle('opacity: 0');
		});
		it('should have custom opacity 0.5 when isDrawerOpen is true', () => {
			const attrs = {
				...defaultAttrs,
				isDrawerOpen: true,
				overlayOpacity: 0.5,
			};
			render(<Drawer {...attrs} />);
			expect(screen.getByTestId('drawer-overlay')).toHaveStyle('opacity: 0.5');
		});
		it('should have default top margin 0 when visibleNavBar is false', () => {
			const attrs = {
				...defaultAttrs,
				isDrawerOpen: true,
				visibleNavBar: false,
			};
			render(<Drawer {...attrs} />);
			expect(screen.getByTestId('drawer-overlay')).toHaveStyle('margin-top: 0');
		});
		it('should have custom top margin 50px when visibleNavBar is true', () => {
			const attrs = {
				...defaultAttrs,
				isDrawerOpen: true,
				visibleNavBar: true,
				navBarHeight: 50,
			};
			render(<Drawer {...attrs} />);
			expect(screen.getByTestId('drawer-overlay')).toHaveStyle('margin-top: 50px');
		});
	});

	describe('drawer', () => {
		const defaultAttrs = {
			isDrawerOpen: true,
			hideDrawer: mockHideDrawer,
		};

		it('should have default width 240px', () => {
			const attrs = {
				...defaultAttrs,
			};
			render(<Drawer {...attrs} />);
			expect(screen.getByTestId('drawer-content')).toHaveStyle('width: 240px;');
		});
		it('should have custom width 400px', () => {
			const attrs = {
				...defaultAttrs,
				width: 400,
			};
			render(<Drawer {...attrs} />);
			expect(screen.getByTestId('drawer-content')).toHaveStyle('width: 400px');
		});
		it('should have default top margin 0 when visibleNavBar is false', () => {
			const attrs = {
				...defaultAttrs,
				visibleNavBar: false,
			};
			render(<Drawer {...attrs} />);
			expect(screen.getByTestId('drawer-content')).toHaveStyle('margin-top: 0');
		});
		it('should have custom top margin 50px when visibleNavBar is true', () => {
			const attrs = {
				...defaultAttrs,
				visibleNavBar: true,
				navBarHeight: 50,
			};
			render(<Drawer {...attrs} />);
			expect(screen.getByTestId('drawer-content')).toHaveStyle('margin-top: 50px');
		});
		it('should collapse when isDrawerOpen is false', () => {
			const attrs = {
				...defaultAttrs,
				isDrawerOpen: false,
			};
			render(<Drawer {...attrs} />);
			expect(screen.getByTestId('drawer-content')).toHaveClass('drawer-content--collapsed');
		});
		it('should expand when isDrawerOpen is true', () => {
			const attrs = {
				...defaultAttrs,
				isDrawerOpen: true,
			};
			render(<Drawer {...attrs} />);
			expect(screen.getByTestId('drawer-content')).not.toHaveClass('drawer-content--collapsed');
		});
		it('should render full width in mobile', () => {
			mockIsMobile = true;
			const attrs = {
				...defaultAttrs,
			};
			render(<Drawer {...attrs} />);
			expect(screen.getByTestId('drawer-content')).toHaveStyle('width: 100%');
		});
	});

	describe('Render content, header, footer', () => {
		const defaultAttrs = {
			isDrawerOpen: true,
			hideDrawer: mockHideDrawer,
		};

		it('should render drawer content', () => {
			const attrs = {
				...defaultAttrs,
				content: <div>content</div>,
			};
			render(<Drawer {...attrs} />);
			expect(screen.getByTestId('drawer-content-main')).toBeInTheDocument();
		});
		it('should render drawer header', () => {
			const attrs = {
				...defaultAttrs,
				header: <div>header</div>,
			};
			render(<Drawer {...attrs} />);
			expect(screen.getByTestId('drawer-content-header')).toBeInTheDocument();
		});
		it('should render drawer footer', () => {
			const attrs = {
				...defaultAttrs,
				footer: <div>footer</div>,
			};
			render(<Drawer {...attrs} />);
			expect(screen.getByTestId('drawer-content-footer')).toBeInTheDocument();
		});
	});
});
