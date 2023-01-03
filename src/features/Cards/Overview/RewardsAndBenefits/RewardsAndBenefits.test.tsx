import React from 'react';
import { render, screen } from '@testing-library/react';
import { DEVICE_TYPE } from '../../../../common/constant/enum/GeneralEnum';
import RewardsAndBenefits, { Banner } from './RewardsAndBenefits';
import { rewardsLinksByCountry } from './constants';

const mockBanner = {
	id: 'banner1',
	image:
		'https://images.ctfassets.net/zie87honde9j/3yyUDZ8NErIWGDBCsEQCZD/9e4c14cd45a3f40ca7d53ebdc2a9dee4/4-online-purchase.jpg',
	subtitle: 'Not receiving what you’ve purchased? We’ve got you covered',
	title: 'Online purchases are safer!',
};
let mockBanners: Banner[] | null = [mockBanner];
jest.mock('launchdarkly-react-client-sdk', () => ({
	__esModule: true,
	useFlags: () => ({
		ccAppRewardsBanner: {
			SG: mockBanners,
		},
	}),
}));

const mockDeviceType: any = DEVICE_TYPE.DESKTOP;
jest.mock('../../../GlobalState/useGlobalState', () => ({
	__esModule: true,
	default: () => ({
		currentCountry: 'SG',
		deviceType: mockDeviceType,
	}),
}));

const mockOpen = jest.fn();

describe('RewardsAndBenefits component', () => {
	beforeEach(() => {
		mockBanners = [mockBanner];
		window.open = mockOpen;
	});

	afterEach(() => {
		(window.open as any).mockReset();
	});

	test('renders RewardsAndBenefits component', () => {
		render(<RewardsAndBenefits />);
		expect(screen.getByTestId('rewards-and-benefits-component')).toBeInTheDocument();
	});

	test('should not render RewardsAndBenefits component when there is no banner', () => {
		mockBanners = [];
		render(<RewardsAndBenefits />);
		expect(screen.queryByTestId('rewards-and-benefits-component')).not.toBeInTheDocument();
	});

	test('should not render RewardsAndBenefits component when there is no content from launchdarkly', () => {
		mockBanners = null;
		render(<RewardsAndBenefits />);
		expect(screen.queryByTestId('rewards-and-benefits-component')).not.toBeInTheDocument();
	});

	test('should go to caskback page when clicked on View All Rewards', () => {
		render(<RewardsAndBenefits />);
		screen.getByRole('button').click();
		expect(mockOpen).toHaveBeenCalledTimes(1);
		expect(mockOpen).toHaveBeenCalledWith(rewardsLinksByCountry.SG, '_blank');
	});
});
