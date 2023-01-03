import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ADD_CARD_STEPS } from './constants';
import AddCard from './index';

const mockedUseNavigate = jest.fn();
let mockedUseParams = jest.mock;
const queryClient = new QueryClient();

jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as any),
	useNavigate: () => mockedUseNavigate,
	useParams: () => mockedUseParams,
}));

describe('UserTypeSelection component', () => {
	const renderComponent = (redirectPath?: string) => {
		const onCloseMock = jest.fn();
		return {
			onCloseMock,
			...render(
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>
						<AddCard allowDefaultRoute redirectURL={redirectPath} />
					</BrowserRouter>
				</QueryClientProvider>
			),
		};
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('should render user type selection component when no sub page route value is provided', () => {
		renderComponent();
		expect(mockedUseNavigate).toHaveBeenCalledWith(`//${ADD_CARD_STEPS.USER_TYPE_SELECTION}`);
	});

	test('should redirect to redirect url when add card flow is close', () => {
		const redirectPath = '/some-path';
		renderComponent('/some-path');
		fireEvent.click(screen.getByTestId('close-icon'));
		expect(mockedUseNavigate).toHaveBeenCalledWith(`${redirectPath}`);
	});

	test('should not redirect when no redirect url is provided', () => {
		renderComponent('');
		expect(mockedUseNavigate).toBeCalledTimes(1);
		fireEvent.click(screen.getByTestId('close-icon'));
		expect(mockedUseNavigate).toBeCalledTimes(1);
	});

	test('should display add card flow proper page when child page value is provided in route', () => {
		mockedUseParams = { step: ADD_CARD_STEPS.USER_DETAILS_FORM } as any;
		renderComponent('');
		expect(screen.getByText('manage_cards.add_card.user_details_form.page_title')).toBeInTheDocument();
	});
});
