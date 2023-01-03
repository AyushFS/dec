import React from 'react';
import { screen, render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStateProvider } from '../../../../GlobalState/GlobalStateProvider';
import StatisticsCard from './StatisticsCard';

const queryClient = new QueryClient();

describe('StatisticsCard component', () => {
	afterAll(() => jest.resetAllMocks());

	test('renders TransactionPage page component', async () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<BrowserRouter>
						<StatisticsCard
							title="title text"
							amount={10}
							actions="action text"
							otherText="other text"
							chart="chart text"
						/>
					</BrowserRouter>
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByTestId('statistics-card-component')).toBeInTheDocument();
		expect(screen.getByText('title text')).toBeInTheDocument();
		expect(screen.getByText('10.00')).toBeInTheDocument();
		expect(screen.getByText('action text')).toBeInTheDocument();
		expect(screen.getByText('other text')).toBeInTheDocument();
		expect(screen.getByText('chart text')).toBeInTheDocument();
	});
});
