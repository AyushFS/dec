import { render, screen } from '@testing-library/react';
import React from 'react';
import { USER_TYPES } from '../../../constants';
import UserTypeSelectionContent from './index';

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

describe('UserTypeSelectionContent component', () => {
	const renderComponent = (props?: { onClose?: () => void; isMobile?: boolean }) => {
		const onCloseMock = jest.fn();
		const onChangeSelectedUserMock = jest.fn();
		const onContinueMock = jest.fn();
		return {
			onCloseMock,
			onChangeSelectedUserMock,
			onContinueMock,
			...render(
				<UserTypeSelectionContent
					{...{
						onClose: onCloseMock,
						selectedUserType: USER_TYPES.NEW_USER,
						onContinue: onContinueMock,
						onChangeSelectedUser: onChangeSelectedUserMock,
						...(props || {}),
					}}
				/>
			),
		};
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('should render user type selection component properly', () => {
		renderComponent();
		expect(screen.getByText(pageTitle)).toBeInTheDocument();
		expect(screen.getByText(newUserButtonLabel)).toBeInTheDocument();
		expect(screen.getByText(existingUserButtonLabel)).toBeInTheDocument();
		expect(screen.getByText(continueButtonLabel)).toBeInTheDocument();
		expect(screen.queryByText(cancelButtonLabel)).not.toBeInTheDocument();
		expect(screen.getByTestId(closeIconTestId)).toBeInTheDocument();
	});

	test('should show cancel button, hide modal for mobile devices', () => {
		renderComponent({ isMobile: true });
		expect(screen.getByText(pageTitle)).toBeInTheDocument();
		expect(screen.getByText(newUserButtonLabel)).toBeInTheDocument();
		expect(screen.getByText(existingUserButtonLabel)).toBeInTheDocument();
		expect(screen.getByText(continueButtonLabel)).toBeInTheDocument();
		expect(screen.getByText(cancelButtonLabel)).toBeInTheDocument();
		expect(screen.queryByTestId(closeIconTestId)).not.toBeInTheDocument();
	});
});
