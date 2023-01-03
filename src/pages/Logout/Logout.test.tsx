import React from 'react';
import { screen, render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Logout from './Logout';
import { GlobalStateProvider } from '../../features/GlobalState/GlobalStateProvider';

const queryClient = new QueryClient();

describe('Logout Page component', () => {
	test('renders Logout page component', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<Logout />
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByTestId('logout-page')).toBeInTheDocument();
	});
});
