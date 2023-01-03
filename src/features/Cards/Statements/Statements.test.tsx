import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import Statements from './Statements';

jest.mock('../../../components/StickyHeader', () => () => <div data-testid="sticky-header-component" />);
jest.mock('./components/BillDetails', () => () => <div data-testid="bill-details-component" />);
jest.mock('./components/DueAmountAlertBox', () => () => <div data-testid="due-amount-alert-box-component" />);
jest.mock('./components/PayBill', () => () => <div data-testid="pay-bill-component" />);
jest.mock('./components/StatementList', () => () => <div data-testid="statement-list-component" />);
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => jest.fn(),
}));

const queryClient = new QueryClient();

describe('Statements component', () => {
	test('renders Statements component', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Statements />
				</BrowserRouter>
			</QueryClientProvider>
		);
		expect(screen.getByTestId('statements-component')).toBeInTheDocument();
		expect(screen.getByTestId('sticky-header-component')).toBeInTheDocument();
	});
});
