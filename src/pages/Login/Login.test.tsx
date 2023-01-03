import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import Login from './Login';
import { GlobalStateProvider } from '../../features/GlobalState/GlobalStateProvider';

const queryClient = new QueryClient();

describe('Login Page component', () => {
	test('renders Login page component', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<BrowserRouter>
						<Login />
					</BrowserRouter>
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByTestId('login-page')).toBeInTheDocument();
	});
});
