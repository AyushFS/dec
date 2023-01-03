import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Cards from './Cards';
import { CardsProvider } from './CardsProvider';
import { GlobalStateProvider } from '../GlobalState/GlobalStateProvider';

const queryClient = new QueryClient();

jest.mock('./Overview/Overview', () => () => <div data-testid="cards-overview-component" />);

describe('Cards component', () => {
	test('renders Cards component', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<CardsProvider>
						<BrowserRouter>
							<Cards />
						</BrowserRouter>
					</CardsProvider>
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByTestId('cards-component')).toBeInTheDocument();
	});
});
