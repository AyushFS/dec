import React from 'react';
import { render, screen } from '@testing-library/react';
import { CARD_STATUS, USER_PERMISSIONS } from '../../../../common/constant/enum/GeneralEnum';
import card from '../mocks/card';
import ManageCardsSidebar from './ManageCardsSidebar';

jest.mock('../CardDetailsAndActions/CardDetailsAndActions', () => () => <div data-testid="card-details-component" />);
jest.mock('./AvailableBalance', () => () => <div data-testid="available-balance-component" />);
jest.mock('../ActivateCardBox', () => () => <div data-testid="activate-card-box-component" />);
jest.mock('./RecentTransactions', () => () => <div data-testid="recent-transactions-component" />);

let mockPermissions: any = [];
jest.mock('../../../Auth/useAuth', () => ({
	default: () => ({
		permissions: mockPermissions,
	}),
	__esModule: true,
}));

describe('Sidebar component', () => {
	beforeEach(() => {
		mockPermissions = [];
	});

	test('renders ManageCardsSidebar component', () => {
		render(<ManageCardsSidebar card={card} />);
		expect(screen.getByTestId('manage-cards-sidebar-component')).toBeInTheDocument();
		expect(screen.getByTestId('card-details-component')).toBeInTheDocument();
	});

	describe('ActivateCardBox', () => {
		test('should not show ActivateCardBox component if card is active', () => {
			const cardData = {
				...card,
				cardStatus: CARD_STATUS.ACTIVATED,
			};
			render(<ManageCardsSidebar card={cardData} />);
			expect(screen.queryByTestId('activate-card-box-component')).not.toBeInTheDocument();
		});

		test('should show ActivateCardBox component if card is not active', () => {
			const cardData = {
				...card,
				cardStatus: CARD_STATUS.PENDING_USER,
			};
			render(<ManageCardsSidebar card={cardData} />);
			expect(screen.getByTestId('activate-card-box-component')).toBeInTheDocument();
		});
	});

	describe('CardStatusMessage', () => {
		test.each([CARD_STATUS.PENDING_CARD_PROVISION, CARD_STATUS.PENDING_DIRECTOR, CARD_STATUS.PENDING_INVITED_USER])(
			'should render properly for %s status',
			(status) => {
				const cardData = {
					...card,
					cardStatus: status,
				};
				render(<ManageCardsSidebar card={cardData} />);
				expect(screen.getByTestId(`card-status-${status}`)).toBeInTheDocument();
			}
		);
	});

	describe('AvailableBalance', () => {
		test('should not show available balance component if card is not active', () => {
			mockPermissions = [];
			const cardData = {
				...card,
				cardStatus: CARD_STATUS.INACTIVE,
			};
			render(<ManageCardsSidebar card={cardData} />);
			expect(screen.queryByTestId('available-balance-component')).not.toBeInTheDocument();
		});

		test('should not show available balance component if card is active but do not have permission', () => {
			mockPermissions = [];
			const cardData = {
				...card,
				cardStatus: CARD_STATUS.ACTIVATED,
			};
			render(<ManageCardsSidebar card={cardData} />);
			expect(screen.queryByTestId('available-balance-component')).not.toBeInTheDocument();
		});

		test('should show available balance component if card is active and there is permission', () => {
			mockPermissions = [USER_PERMISSIONS.CARDS_SUMMARY_VIEW];
			const cardData = {
				...card,
				cardStatus: CARD_STATUS.ACTIVATED,
			};
			render(<ManageCardsSidebar card={cardData} />);
			expect(screen.getByTestId('available-balance-component')).toBeInTheDocument();
		});
	});

	describe('RecentTransactions', () => {
		test('should not show recent transactions component if card is not active', () => {
			mockPermissions = [];
			const cardData = {
				...card,
				cardStatus: CARD_STATUS.INACTIVE,
			};
			render(<ManageCardsSidebar card={cardData} />);
			expect(screen.queryByTestId('recent-transactions-component')).not.toBeInTheDocument();
		});

		test('should not show recent transactions component if card is active but do not have permission', () => {
			mockPermissions = [];
			const cardData = {
				...card,
				cardStatus: CARD_STATUS.ACTIVATED,
			};
			render(<ManageCardsSidebar card={cardData} />);
			expect(screen.queryByTestId('recent-transactions-component')).not.toBeInTheDocument();
		});

		test('should show recent transactions component if card is active and there is permission', () => {
			mockPermissions = [USER_PERMISSIONS.TRANSACTIONS_VIEW];
			const cardData = {
				...card,
				cardStatus: CARD_STATUS.ACTIVATED,
			};
			render(<ManageCardsSidebar card={cardData} />);
			expect(screen.getByTestId('recent-transactions-component')).toBeInTheDocument();
		});
	});
});
