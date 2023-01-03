import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DEVICE_TYPE } from '../../../common/constant/enum/GeneralEnum';
import { GlobalStateProvider } from '../../GlobalState/GlobalStateProvider';
import Overview from './Overview';

jest.mock('./Statistics/WelcomeBox', () => () => <div data-testid="welcome-box-component" />);
jest.mock('./Statistics', () => () => <div data-testid="statistics-component" />);
jest.mock('./MyCards', () => () => <div data-testid="my-cards-component" />);
jest.mock('./QuickActions', () => () => <div data-testid="quick-actions-component" />);
jest.mock('./RecentTransactions', () => () => <div data-testid="recent-transactions-component" />);
jest.mock('./RewardsAndBenefits', () => () => <div data-testid="rewards-and-benefits-component" />);

let mockDeviceType: any = DEVICE_TYPE.TABLET;
jest.mock('../../GlobalState/useGlobalState', () => ({
	__esModule: true,
	default: () => ({
		currentCountry: 'SG',
		deviceType: mockDeviceType,
	}),
}));

const queryClient = new QueryClient();
const renderComponent = () =>
	render(
		<QueryClientProvider client={queryClient}>
			<GlobalStateProvider>
				<BrowserRouter>
					<Overview />
				</BrowserRouter>
			</GlobalStateProvider>
		</QueryClientProvider>
	);

describe('Overview component', () => {
	beforeEach(() => {
		mockDeviceType = DEVICE_TYPE.TABLET;
		jest.clearAllMocks();
		jest.resetAllMocks();
	});

	test('renders Overview component', () => {
		renderComponent();
		expect(screen.getByTestId('overview-component')).toBeInTheDocument();
		expect(screen.getByTestId('statistics-component')).toBeInTheDocument();
		expect(screen.getByTestId('my-cards-component')).toBeInTheDocument();
		expect(screen.getByTestId('quick-actions-component')).toBeInTheDocument();
		expect(screen.getByTestId('rewards-and-benefits-component')).toBeInTheDocument();
		expect(screen.getByTestId('recent-transactions-component')).toBeInTheDocument();
	});

	test('should render Welcome in Mobile', () => {
		mockDeviceType = DEVICE_TYPE.MOBILE;
		renderComponent();
		expect(screen.getByTestId('welcome-box-component')).toBeInTheDocument();
	});

	test('should render Welcome in Tablet', () => {
		mockDeviceType = DEVICE_TYPE.TABLET;
		renderComponent();
		expect(screen.getByTestId('welcome-box-component')).toBeInTheDocument();
	});

	test('should not render Welcome in Desktop', () => {
		mockDeviceType = DEVICE_TYPE.DESKTOP;
		renderComponent();
		expect(screen.queryByTestId('welcome-box-component')).not.toBeInTheDocument();
	});
});
