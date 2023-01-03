import React from 'react';
import { render, screen } from '@testing-library/react';
import ActivateCardBox from './ActivateCardBox';

const onClickMock = jest.fn();

describe('ActivateCardBox component', () => {
	test('renders ActivateCardBox component', () => {
		render(<ActivateCardBox onClick={onClickMock} />);
		expect(screen.getByTestId('activate-card-box-component')).toBeInTheDocument();
	});

	test('should have a button with correcttext', () => {
		render(<ActivateCardBox onClick={onClickMock} />);
		expect(screen.getByRole('button')).toBeInTheDocument();
		expect(screen.getByRole('button')).toHaveTextContent('manage_cards.card_details.activate_card_box.button');
	});

	test('should trigger onClick function when button is clicked', () => {
		render(<ActivateCardBox onClick={onClickMock} />);
		screen.getByRole('button').click();
		expect(onClickMock).toHaveBeenCalled();
	});
});
