import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GlobalStateProvider } from '../../../../GlobalState/GlobalStateProvider';
import AvailableCashbackBox from './AvailableCashbackBox';

jest.mock('../../../../GlobalState/useGlobalState', () => ({
	default: () => ({
		currentCountry: 'SG',
	}),
	__esModule: true,
}));

const mockRefetchTotalCashbackEarned = jest.fn();
const mockRefetchCashbackDetails = jest.fn();
let mockLoadingStatus = false;
jest.mock('../../../UseCards', () => ({
	default: () => ({
		getTotalCashbackEarnedQuery: {
			refetch: mockRefetchTotalCashbackEarned,
			isLoading: mockLoadingStatus,
		},
		getCashbackDetailsQuery: {
			refetch: mockRefetchCashbackDetails,
		},
		totalCashbackEarned: 1000,
		cashbackDetails: {
			currentRemainingBalance: 200,
		},
	}),
	__esModule: true,
}));

const queryClient = new QueryClient();
const mockOnViewCashbackClick = jest.fn();

describe('AvailableCashbackBox component', () => {
	test('renders AvailableCashbackBox component', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<AvailableCashbackBox onViewCashbackClick={mockOnViewCashbackClick} />
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByTestId('available-cashback-box-component')).toBeInTheDocument();
		expect(screen.getByTestId('statistics-card-component')).toBeInTheDocument();
		expect(mockRefetchCashbackDetails).toHaveBeenCalledTimes(1);
		expect(mockRefetchTotalCashbackEarned).toHaveBeenCalledTimes(1);
	});

	test('renders title', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<AvailableCashbackBox onViewCashbackClick={mockOnViewCashbackClick} />
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByText('overview.available_cashback_small.title')).toBeInTheDocument();
	});

	test('renders View Cashback button', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<AvailableCashbackBox onViewCashbackClick={mockOnViewCashbackClick} />
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByText('overview.available_cashback_small.view_cashback')).toBeInTheDocument();
	});

	test('renders Available cashback Amount', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<AvailableCashbackBox onViewCashbackClick={mockOnViewCashbackClick} />
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByText('200.00')).toBeInTheDocument();
	});

	test('renders total earned text and Amount', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<AvailableCashbackBox onViewCashbackClick={mockOnViewCashbackClick} />
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByText('overview.available_cashback_small.total_earned: 1,000.00')).toBeInTheDocument();
	});

	test('should call mockOnViewCashbackClick when clicked on view cashbacks button', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<AvailableCashbackBox onViewCashbackClick={mockOnViewCashbackClick} />
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		const button = screen.getByText('overview.available_cashback_small.view_cashback');
		button.click();
		expect(mockOnViewCashbackClick).toHaveBeenCalledTimes(1);
	});

	test('should show loading text when data is loading', () => {
		mockLoadingStatus = true;
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<AvailableCashbackBox onViewCashbackClick={mockOnViewCashbackClick} />
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByText('common.loading')).toBeInTheDocument();
	});
});
