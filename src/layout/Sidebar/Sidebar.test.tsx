import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Sidebar from './Sidebar';
import { GlobalStateProvider } from '../../features/GlobalState/GlobalStateProvider';

let mockToggleDrawer = jest.fn();
const attrs = {
	isDrawerOpen: true,
	hideDrawer: mockToggleDrawer,
	navBarHeight: 64,
	visibleNavBar: false,
	fixedDrawer: false,
	hasOverlay: false,
};

let mockIsMobile = false;
jest.mock('../../features/GlobalState/useGlobalState', () => () => ({
	isMobile: mockIsMobile,
	toggleDrawer: mockToggleDrawer,
}));

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useLocation: () => ({
		pathname: '/',
	}),
}));

const queryClient = new QueryClient();
const renderComponent = () => {
	return render(
		<QueryClientProvider client={queryClient}>
			<GlobalStateProvider>
				<BrowserRouter>
					<Sidebar drawerAttrs={attrs} />
				</BrowserRouter>
			</GlobalStateProvider>
		</QueryClientProvider>
	);
};

describe('Sidebar component', () => {
	beforeEach(() => {
		mockToggleDrawer = jest.fn();
		mockIsMobile = false;
		jest.resetAllMocks();
	});

	test('renders Sidebar component', () => {
		renderComponent();
		expect(screen.getByTestId('drawer-content')).toBeInTheDocument();
	});

	test('should call toggleDrawer when close button is clicked', () => {
		renderComponent();
		const closeButton = screen.getByTestId('close-button');
		closeButton.click();
		expect(mockToggleDrawer).toHaveBeenCalled();
		expect(mockToggleDrawer).toHaveBeenCalledWith();
	});

	test('should call toggleDrawer when menu item is clicked and isMobile is true', () => {
		mockIsMobile = true;
		renderComponent();
		screen.getAllByTestId('tree-item-component')[0].click();
		expect(mockToggleDrawer).toHaveBeenCalled();
		expect(mockToggleDrawer).toHaveBeenCalledWith('main');
	});

	test('should not call toggleDrawer when menu item is clicked and isMobile is false', () => {
		mockIsMobile = false;
		renderComponent();
		screen.getAllByTestId('tree-item-component')[0].click();
		expect(mockToggleDrawer).not.toHaveBeenCalled();
	});
});
