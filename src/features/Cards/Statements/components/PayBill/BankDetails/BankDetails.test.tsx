import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import BankDetails from './BankDetails';
import { CardsProvider } from '../../../../CardsProvider';
import { GlobalStateProvider } from '../../../../../GlobalState/GlobalStateProvider';

const queryClient = new QueryClient();

const mockOnBankDetailsLoaded = jest.fn();

describe('BankDetails component', () => {
	test('renders BankDetails component', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<CardsProvider>
						<BankDetails onBankDetailsLoaded={mockOnBankDetailsLoaded} />
					</CardsProvider>
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByTestId('bank-details-component')).toBeInTheDocument();
	});
});
