import React from 'react';
import { screen, render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import ManageCardsPage from './ManageCardsPage';
import { GlobalStateProvider } from '../../GlobalState/GlobalStateProvider';

const queryClient = new QueryClient();

jest.mock('../../Auth/useAuth', () => ({
	__esModule: true,
	default: () => ({
		auth: {},
	}),
}));

describe('ManageCardsPage component', () => {
	afterAll(() => jest.resetAllMocks());

	test('renders CardsPage page component', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<BrowserRouter>
						<ManageCardsPage />
					</BrowserRouter>
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByTestId('manage-cards-page')).toBeInTheDocument();
	});
});
