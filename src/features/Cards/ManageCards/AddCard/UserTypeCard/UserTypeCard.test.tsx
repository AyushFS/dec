import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { USER_TYPES } from '../constants';
import UserTypeCard from './index';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as any),
	useNavigate: () => mockedUseNavigate,
}));

const cardTitle = 'Test title';
const secondCardTitle = 'Test title2';
const cardDescription = 'Test description';

describe('UserTypeCard component', () => {
	const onSelectedMock = jest.fn();
	const renderComponent = () => {
		return {
			onSelectedMock,
			...render(
				<UserTypeCard
					checked
					title={cardTitle}
					description={cardDescription}
					value={USER_TYPES.NEW_USER}
					onSelected={onSelectedMock}
				/>
			),
		};
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('should render content properly', () => {
		renderComponent();
		expect(screen.getByText(cardTitle)).toBeInTheDocument();
		expect(screen.getByTestId(`radio-${USER_TYPES.NEW_USER}`)).toBeChecked();
	});

	test('should select the card when clicked on it', () => {
		render(
			<>
				<UserTypeCard
					checked
					title={cardTitle}
					description={cardDescription}
					value={USER_TYPES.NEW_USER}
					onSelected={onSelectedMock}
				/>
				<UserTypeCard
					checked
					title={secondCardTitle}
					description={cardDescription}
					value={USER_TYPES.EXISTING_USER}
					onSelected={onSelectedMock}
				/>
			</>
		);
		fireEvent.click(screen.getByText(secondCardTitle));
		expect(screen.getByTestId(`radio-${USER_TYPES.EXISTING_USER}`)).toBeChecked();
		expect(onSelectedMock).toHaveBeenCalledWith(USER_TYPES.EXISTING_USER);
	});
});
