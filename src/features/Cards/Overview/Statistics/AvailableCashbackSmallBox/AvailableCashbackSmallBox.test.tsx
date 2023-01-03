import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GlobalStateProvider } from '../../../../GlobalState/GlobalStateProvider';
import AvailableCashbackSmallBox from './AvailableCashbackSmallBox';
import { CardsProvider } from '../../../CardsProvider';

jest.mock('../../../../GlobalState/useGlobalState', () => () => ({
	currentCountry: 'SG',
	setLoader: jest.fn(),
}));

let mockIsLoading = true;
const mockRefetch = jest.fn();
jest.mock('../../../UseCards', () => ({
	__esModule: true,
	default: () => ({
		totalCashbackEarned: 100,
		getTotalCashbackEarnedQuery: { isLoading: mockIsLoading, refetch: mockRefetch },
	}),
}));

const queryClient = new QueryClient();
const renderComponent = () => {
	return render(
		<QueryClientProvider client={queryClient}>
			<GlobalStateProvider>
				<CardsProvider>
					<AvailableCashbackSmallBox />
				</CardsProvider>
			</GlobalStateProvider>
		</QueryClientProvider>
	);
};

describe('AvailableCashbackSmallBox component', () => {
	test('renders AvailableCashbackSmallBox component', () => {
		renderComponent();
		expect(screen.getByTestId('available-cashback-small-box-component')).toBeInTheDocument();
	});

	test('should call refetch when component is mounted', () => {
		renderComponent();
		expect(mockRefetch).toHaveBeenCalled();
		expect(mockRefetch).toHaveBeenCalledTimes(1);
	});

	test('should show loading when cards are loading', () => {
		mockIsLoading = true;
		renderComponent();
		expect(screen.getByText('common.loading')).toBeInTheDocument();
	});

	test('should show cashback amount with correct currency code when cards are loaded', () => {
		mockIsLoading = false;
		renderComponent();
		expect(screen.getByText('SGD')).toBeInTheDocument();
		expect(screen.getByText('100.00')).toBeInTheDocument();
	});
});
