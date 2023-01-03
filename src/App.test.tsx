import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { act } from 'react-dom/test-utils';
import { GlobalStateProvider } from './features/GlobalState/GlobalStateProvider';
import App from './App';

const queryClient = new QueryClient();

const mockSetSnackbar = jest.fn();
const mockOnSnackbarDismiss = jest.fn();
let mockSnackbar: any = {
	message: 'Snackbar Message',
	onSnackbarDismiss: mockOnSnackbarDismiss,
};
const mockBoot = jest.fn();
const mockInitDatadog = jest.fn();

jest.mock('./features/Auth/useAuth', () => ({
	default: () => ({
		auth: { first_name: 'test name' },
	}),
	__esModule: true,
}));

jest.mock('react-use-intercom', () => ({
	useIntercom: () => ({
		boot: mockBoot,
	}),
}));

jest.mock('./features/Monitoring/useMonitoring', () => ({
	default: () => ({
		initDatadog: mockInitDatadog,
	}),
	__esModule: true,
}));

jest.mock('./features/GlobalState/useGlobalState', () => ({
	default: () => ({
		snackbar: mockSnackbar,
		setSnackbar: mockSetSnackbar,
		isDrawerOpen: () => false,
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

	test('should call intercom and monitoring related functions', () => {
		renderComponent();
		expect(mockBoot).toHaveBeenCalled();
		expect(mockBoot).toHaveBeenCalledWith({ name: 'test name' });
		expect(mockInitDatadog).toHaveBeenCalled();
	});

	test('should call setSnackbar and not call onSnackbarDismiss close snackbar when onSnackbarDismiss is not defined', () => {
		renderComponent();
		expect(screen.getByTestId('snackbar-component')).toBeInTheDocument();
		act(() => {
			screen.getByTestId('snackbar-trigger').click();
		});
		expect(screen.queryByTestId('snackbar-component')).not.toBeInTheDocument();
		expect(mockOnSnackbarDismiss).toHaveBeenCalledTimes(1);
		expect(mockSetSnackbar).toHaveBeenCalledTimes(1);
	});

	test('should call setSnackbar and call onSnackbarDismiss close snackbar when onSnackbarDismiss is defined', () => {
		mockSnackbar = {
			message: 'Snackbar Message',
		};
		renderComponent();
		expect(screen.getByTestId('snackbar-component')).toBeInTheDocument();
		act(() => {
			screen.getByTestId('snackbar-trigger').click();
		});
		expect(screen.queryByTestId('snackbar-component')).not.toBeInTheDocument();
		expect(mockOnSnackbarDismiss).not.toHaveBeenCalled();
		expect(mockSetSnackbar).toHaveBeenCalledTimes(1);
	});
});
