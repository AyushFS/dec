import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { act } from 'react-dom/test-utils';
import { GlobalStateProvider } from '../../../../GlobalState/GlobalStateProvider';
import TotalCreditBox from './TotalCreditBox';
import { DEVICE_TYPE } from '../../../../../common/constant/enum/GeneralEnum';

const mockOpen = jest.fn();
const mockAuthData: any = {
	auth: {
		first_name: 'John',
	},
};
let mockDeviceType: any = DEVICE_TYPE.DESKTOP;
jest.mock('../../../../Auth/useAuth', () => ({
	default: () => mockAuthData,
	__esModule: true,
}));
jest.mock('@nivo/pie', () => ({
	ResponsivePie: () => <div data-testid="responsive-pie" />,
}));
jest.mock('../../../../GlobalState/useGlobalState', () => ({
	__esModule: true,
	default: () => ({
		currentCountry: 'SG',
		deviceType: mockDeviceType,
	}),
}));
let mockIsLoadingCards = false;
let mockCardsSummary: any = {
	totalLimit: '30000',
	outstandingLimit: '2801',
	remainingLimit: '27199',
};
jest.mock('../../../UseCards', () => ({
	__esModule: true,
	default: () => ({
		cardsSummary: mockCardsSummary,
		isLoadingCards: mockIsLoadingCards,
	}),
}));

let mockCcAppNeedHigherCreditLimit = true;
jest.mock('launchdarkly-react-client-sdk', () => ({
	__esModule: true,
	useFlags: () => ({
		ccAppNeedHigherCreditLimit: mockCcAppNeedHigherCreditLimit,
	}),
}));

const queryClient = new QueryClient();
const renderComponent = () =>
	render(
		<QueryClientProvider client={queryClient}>
			<GlobalStateProvider>
				<TotalCreditBox />
			</GlobalStateProvider>
		</QueryClientProvider>
	);

describe('TotalCreditBox component', () => {
	beforeEach(() => {
		window.open = mockOpen;
		mockDeviceType = DEVICE_TYPE.DESKTOP;
		mockIsLoadingCards = false;
		mockCardsSummary = {
			totalLimit: '30000',
			outstandingLimit: '2801',
			remainingLimit: '27199',
		};
		mockCcAppNeedHigherCreditLimit = true;
	});

	afterEach(() => {
		(window.open as any).mockReset();
	});
	test('renders TotalCreditBox component', () => {
		renderComponent();
		expect(screen.getByTestId('total-credit-box-component')).toBeInTheDocument();
	});

	test('renders chart', () => {
		renderComponent();
		expect(screen.getByTestId('responsive-pie')).toBeInTheDocument();
	});

	test('should show hide popup when clicked on show/hide details button', () => {
		renderComponent();
		expect(screen.queryByTestId('total-credit-box-popup')).not.toBeInTheDocument();
		act(() => {
			screen.getByTestId('show-hide-details-btn').click();
		});
		expect(screen.getByTestId('total-credit-box-popup')).toBeInTheDocument();
		act(() => {
			screen.getByTestId('show-hide-details-btn').click();
		});
		expect(screen.queryByTestId('total-credit-box-popup')).not.toBeInTheDocument();
	});

	test('should open link when clicked on need higher limit button', () => {
		renderComponent();
		act(() => {
			screen.getByTestId('show-hide-details-btn').click();
		});
		act(() => {
			screen.getByTestId('need-higher-limit-btn').click();
		});
		expect(mockOpen).toHaveBeenCalled();
	});

	test('should show need higher limit button when ccAppNeedHigherCreditLimit LD flag is true', () => {
		mockCcAppNeedHigherCreditLimit = true;
		renderComponent();
		act(() => {
			screen.getByTestId('show-hide-details-btn').click();
		});
		expect(screen.getByTestId('total-credit-box-popup')).toBeInTheDocument();
		expect(screen.getByText('overview.total_credit_limit.need_higher_limit')).toBeInTheDocument();
	});

	test('should not show need higher limit button when ccAppNeedHigherCreditLimit LD flag is false', () => {
		mockCcAppNeedHigherCreditLimit = false;
		renderComponent();
		act(() => {
			screen.getByTestId('show-hide-details-btn').click();
		});
		expect(screen.getByTestId('total-credit-box-popup')).toBeInTheDocument();
		expect(screen.queryByText('overview.total_credit_limit.need_higher_limit')).not.toBeInTheDocument();
	});

	describe('show/hide text', () => {
		test('should show "show details" for desktop', () => {
			mockDeviceType = DEVICE_TYPE.DESKTOP;
			renderComponent();
			expect(screen.getByText('overview.total_credit_limit.show_details')).toBeInTheDocument();
		});

		test('should show "hide details" for desktop', () => {
			mockDeviceType = DEVICE_TYPE.DESKTOP;
			renderComponent();
			act(() => {
				screen.getByTestId('show-hide-details-btn').click();
			});
			expect(screen.getByText('overview.total_credit_limit.hide_details')).toBeInTheDocument();
		});

		test('should show "show limit details" for mobile', () => {
			mockDeviceType = DEVICE_TYPE.MOBILE;
			renderComponent();
			expect(screen.getByText('overview.total_credit_limit.show_limit_details')).toBeInTheDocument();
		});

		test('should show "hide limit details" for mobile', () => {
			mockDeviceType = DEVICE_TYPE.MOBILE;
			renderComponent();
			act(() => {
				screen.getByTestId('show-hide-details-btn').click();
			});
			expect(screen.getByText('overview.total_credit_limit.hide_limit_details')).toBeInTheDocument();
		});
	});

	describe('amount', () => {
		test('should show 0 for amount when isLoadingCards is true', () => {
			mockIsLoadingCards = true;
			renderComponent();
			expect(screen.getByTestId('amount')).toHaveTextContent('0.00');
		});

		test('should show 0 for amount when isLoadingCards is false and cardsSummary.remainingLimit is not set', () => {
			mockIsLoadingCards = false;
			mockCardsSummary = {
				totalLimit: '',
				outstandingLimit: '',
				remainingLimit: '',
			};
			renderComponent();
			expect(screen.getByTestId('amount')).toHaveTextContent('0.00');
		});

		test('should show remaining limit value for amount when isLoadingCards is false and cardsSummary.remainingLimit is set', () => {
			mockIsLoadingCards = false;
			renderComponent();
			expect(screen.getByTestId('amount')).toHaveTextContent('27,199.00');
		});
	});

	describe('totalLimit', () => {
		test('should show 0 for totalLimit when isLoadingCards is true', () => {
			mockIsLoadingCards = true;
			renderComponent();
			expect(screen.getByTestId('other-text')).toHaveTextContent('/ 0.00');
		});

		test('should show 0 for totalLimit when isLoadingCards is false and cardsSummary.totalLimit is not set', () => {
			mockIsLoadingCards = false;
			mockCardsSummary = {
				totalLimit: '',
				outstandingLimit: '',
				remainingLimit: '',
			};
			renderComponent();
			expect(screen.getByTestId('other-text')).toHaveTextContent('/ 0.00');
		});

		test('should show total limit value for totalLimit when isLoadingCards is false and cardsSummary.totalLimit is set', () => {
			mockIsLoadingCards = false;
			renderComponent();
			expect(screen.getByTestId('other-text')).toHaveTextContent('30,000.00');
		});
	});
});
