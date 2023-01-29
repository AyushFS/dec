import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { GlobalStateProvider } from './features/GlobalState/GlobalStateProvider';
import App from './App';

const queryClient = new QueryClient();
const mockInitDatadog = jest.fn();

jest.mock('./features/Auth/useAuth', () => ({
	default: () => ({
		auth: { first_name: 'test name' },
	}),
	__esModule: true,
}));

jest.mock('./features/Monitoring/useMonitoring', () => ({
	default: () => ({
		initDatadog: mockInitDatadog,
	}),
	__esModule: true,
}));

const renderComponent = () => {
	return render(
		<QueryClientProvider client={queryClient}>
			<GlobalStateProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</GlobalStateProvider>
		</QueryClientProvider>
	);
};

describe('App component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.resetAllMocks();
	});

	test('renders App component', () => {
		renderComponent();
		expect(screen.getByRole('main')).toBeInTheDocument();
	});

	test('should call monitoring related functions', () => {
		renderComponent();
		expect(mockInitDatadog).toHaveBeenCalled();
	});
});
