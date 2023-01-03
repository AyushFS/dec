import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GlobalStateProvider } from '../../../../GlobalState/GlobalStateProvider';
import card from '../../mocks/card';
import AvailableBalance from './AvailableBalance';

const queryClient = new QueryClient();

describe('AvailableBalance component', () => {
	test('renders AvailableBalance component with card values', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<AvailableBalance card={card} />
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByTestId('available-balance-component')).toBeInTheDocument();
		expect(screen.getByText('manage_cards.card_details.available_balance')).toBeInTheDocument();
		expect(screen.getByText('manage_cards.card_details.manage_limit')).toBeInTheDocument();
		expect(screen.getByText('manage_cards.card_details.spending_limit')).toBeInTheDocument();
		expect(screen.getByText('1,000.00')).toBeInTheDocument();
		expect(screen.getByTestId('available-balance-component')).toHaveTextContent('SGD 9,000.00/SGD 10,000.00');
		expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
		expect(screen.getByTestId('progress-bar')).toHaveStyle('width: 90%');
	});
});
