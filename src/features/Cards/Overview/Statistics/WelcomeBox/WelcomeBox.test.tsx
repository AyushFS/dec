import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GlobalStateProvider } from '../../../../GlobalState/GlobalStateProvider';
import WelcomeBox from './WelcomeBox';

jest.mock('../AvailableCashbackSmallBox', () => () => <div data-testid="available-cashback-small-box-component" />);

const mockAuthData: any = {
	auth: {
		first_name: 'John',
	},
};
jest.mock('../../../../Auth/useAuth', () => ({
	default: () => mockAuthData,
	__esModule: true,
}));

const queryClient = new QueryClient();

describe('WelcomeBox component', () => {
	test('renders WelcomeBox component', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<WelcomeBox />
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByTestId('welcome-box-component')).toBeInTheDocument();
		expect(screen.getByTestId('available-cashback-small-box-component')).toBeInTheDocument();
		expect(screen.getByText('overview.welcome_message.welcome_back')).toBeInTheDocument();
		expect(screen.getByText(mockAuthData.auth.first_name)).toBeInTheDocument();
	});
});
