import React from 'react';
import { render, screen } from '@testing-library/react';
import CardActions from './CardActions';
import card from '../mocks/card';
import { USER_PERMISSIONS } from '../../../../common/constant/enum/GeneralEnum';

jest.mock('../CardDetailsAndActions/CopyCardNumber/CopyCardNumber', () => () => (
	<div data-testid="copy-card-number-component" />
));
jest.mock('../CardDetailsAndActions/ShowCardDetails/ShowCardDetails', () => () => (
	<div data-testid="show-card-details-component" />
));
jest.mock('../CardDetailsAndActions/ToggleLockCard/ToggleLockCard', () => () => (
	<div data-testid="toggle-lock-card-component" />
));

let mockPermissions: any = [];
jest.mock('../../../Auth/useAuth', () => ({
	default: () => ({
		permissions: mockPermissions,
	}),
	__esModule: true,
}));

describe('CardActions component', () => {
	beforeEach(() => {
		mockPermissions = [];
	});

	test('renders CardActions component', () => {
		render(<CardActions card={card} />);
		expect(screen.getByTestId('card-actions-component')).toBeInTheDocument();
	});

	test('renders CardActions component with toggle card details if there is permission', () => {
		mockPermissions = [USER_PERMISSIONS.CARDS_INFO_VIEW];
		render(<CardActions card={card} />);
		expect(screen.getByTestId('show-card-details-component')).toBeInTheDocument();
	});

	test('renders CardActions component without toggle card details if there is no permission', () => {
		mockPermissions = [];
		render(<CardActions card={card} />);
		expect(screen.queryByTestId('show-card-details-component')).not.toBeInTheDocument();
	});

	test('renders CardActions component with copy card number if there is permission', () => {
		mockPermissions = [USER_PERMISSIONS.CARDS_INFO_VIEW];
		render(<CardActions card={card} />);
		expect(screen.getByTestId('copy-card-number-component')).toBeInTheDocument();
	});

	test('renders CardActions component without copy card number if there is no permission', () => {
		mockPermissions = [];
		render(<CardActions card={card} />);
		expect(screen.queryByTestId('copy-card-number-component')).not.toBeInTheDocument();
	});

	test('renders CardActions component with toggle lock status if there is permission', () => {
		mockPermissions = [USER_PERMISSIONS.CARD_LOCK_STATUS_UPDATE];
		render(<CardActions card={card} />);
		expect(screen.getByTestId('toggle-lock-card-component')).toBeInTheDocument();
	});

	test('renders CardActions component without toggle lock status if there is no permission', () => {
		mockPermissions = [];
		render(<CardActions card={card} />);
		expect(screen.queryByTestId('toggle-lock-card-component')).not.toBeInTheDocument();
	});
});
