import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import UserTypeSelection from './index';

let mockIsMobile = false;
jest.mock('../../../../../GlobalState/useGlobalState', () => ({
	__esModule: true,
	default: () => ({
		isMobile: mockIsMobile,
	}),
}));

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as any),
	useNavigate: () => mockedUseNavigate,
}));

const pageTitle = 'manage_cards.add_card.user_type_selection.page_title';
const newUserButtonLabel = 'manage_cards.add_card.user_type_selection.new_user';
const existingUserButtonLabel = 'manage_cards.add_card.user_type_selection.existing_user';
const continueButtonLabel = 'manage_cards.add_card.user_type_selection.continue_button';
const cancelButtonLabel = 'manage_cards.add_card.user_type_selection.cancel_button';
const closeIconTestId = 'close-icon';
const modalTestId = 'modal-component';

describe('UserTypeSelection component', () => {
	const renderComponent = (props?: { onClose?: () => void }) => {
		const onCloseMock = jest.fn();
		return {
			onCloseMock,
			...render(<UserTypeSelection {...{ onClose: onCloseMock, ...(props || {}) }} />),
		};
	};

	afterEach(() => {
		jest.clearAllMocks();
		mockIsMobile = false;
	});

	test('should render user type selection component properly', () => {
		renderComponent();
		expect(screen.getByText(pageTitle)).toBeInTheDocument();
		expect(screen.getByText(newUserButtonLabel)).toBeInTheDocument();
		expect(screen.getByText(existingUserButtonLabel)).toBeInTheDocument();
		expect(screen.getByText(continueButtonLabel)).toBeInTheDocument();
		expect(screen.queryByText(cancelButtonLabel)).not.toBeInTheDocument();
		expect(screen.getByTestId(closeIconTestId)).toBeInTheDocument();
		expect(screen.getByTestId(modalTestId)).toBeInTheDocument();
	});

	test('should show cancel button, hide modal for mobile devices', () => {
		mockIsMobile = true;
		renderComponent();
		expect(screen.getByText(pageTitle)).toBeInTheDocument();
		expect(screen.getByText(newUserButtonLabel)).toBeInTheDocument();
		expect(screen.getByText(existingUserButtonLabel)).toBeInTheDocument();
		expect(screen.getByText(continueButtonLabel)).toBeInTheDocument();
		expect(screen.getByText(cancelButtonLabel)).toBeInTheDocument();
		expect(screen.queryByTestId(closeIconTestId)).not.toBeInTheDocument();
		expect(screen.queryByTestId(modalTestId)).not.toBeInTheDocument();
	});

	test('should call on close modal when clicked on close icon', () => {
		renderComponent({ onClose: undefined });
		expect(screen.getByTestId(modalTestId)).toBeInTheDocument();
		fireEvent.click(screen.getByTestId(closeIconTestId));
		expect(screen.queryByTestId(modalTestId)).not.toBeInTheDocument();
	});

	test('should call on close callback when cancel button is pressed on mobile devices', () => {
		mockIsMobile = true;
		const { onCloseMock } = renderComponent();
		fireEvent.click(screen.getByText(cancelButtonLabel));
		expect(onCloseMock).toHaveBeenCalled();
	});

	test('should redirect to user details when clicked on continue button with default selection', () => {
		renderComponent();
		fireEvent.click(screen.getByText(continueButtonLabel));
		expect(mockedUseNavigate).toHaveBeenCalledWith('add-card/user-details');
	});

	test('should redirect to user list page on continue button click with existing user selection', () => {
		renderComponent();
		fireEvent.click(screen.getByText(existingUserButtonLabel));
		fireEvent.click(screen.getByText(continueButtonLabel));
		expect(mockedUseNavigate).toHaveBeenCalledWith('add-card/user-list');
	});
});
