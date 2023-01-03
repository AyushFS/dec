import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

jest.mock('../Nav', () => () => <div data-testid="nav-menu" />);

const mockToggleDrawer = jest.fn();
jest.mock('../../features/GlobalState/useGlobalState', () => ({
	default: () => ({
		toggleDrawer: mockToggleDrawer,
		pageData: {
			title: 'Test Title',
		},
	}),
	__esModule: true,
}));

describe('Header component', () => {
	test('renders Header component', () => {
		render(<Header />);
		expect(screen.getByTestId('header-component')).toBeInTheDocument();
		expect(screen.getByTestId('nav-menu')).toBeInTheDocument();
		expect(screen.getByText('Test Title')).toBeInTheDocument();
	});

	test('should call toggleDrawer when hamburger is clicked', () => {
		render(<Header />);
		screen.getByRole('button').click();
		expect(mockToggleDrawer).toBeCalled();
		expect(mockToggleDrawer).toBeCalledTimes(1);
	});
});
