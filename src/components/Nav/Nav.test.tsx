import React from 'react';
import { render, screen } from '@testing-library/react';
import Nav from './Nav';
import Routes from '../../routes';

jest.mock('react-router-dom', () => ({
	Link: ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to}>{children}</a>,
	useLocation: () => ({
		pathname: '/',
	}),
}));

let mockAuth: any = null;
jest.mock('../../features/Auth/useAuth', () => ({
	default: () => ({
		auth: mockAuth,
	}),
	__esModule: true,
}));

describe('Nav component', () => {
	test('renders Nav component', () => {
		render(<Nav />);
		const navElement = screen.getByTestId('nav-menu');
		expect(navElement).toBeInTheDocument();
	});

	describe('Nav rendering based on auth state', () => {
		test('renders Nav component with Login link when auth is null', () => {
			render(<Nav />);
			const navElement = screen.getByTestId('nav-menu');
			expect(navElement).toHaveTextContent(Routes.login.title);
		});

		test('renders Nav component with Logout link when auth is not null', () => {
			mockAuth = { aaccess_token: '12345' };
			render(<Nav />);
			const navElement = screen.getByTestId('nav-menu');
			expect(navElement).toHaveTextContent(Routes.logout.title);
		});
	});
});
