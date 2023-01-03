import React from 'react';
import { render, screen } from '@testing-library/react';
import CardDetailsAndActions from './CardDetailsAndActions';
import card from '../mocks/card';

jest.mock('../../components/CreditCard/CreditCard', () => () => <div data-testid="credit-card-component" />);
jest.mock('../CardActions/CardActions', () => () => <div data-testid="credit-actions-component" />);

describe('CardDetailsAndActions component', () => {
	test('renders CardDetailsAndActions component', () => {
		render(<CardDetailsAndActions card={card} />);
		expect(screen.getByTestId('card-details-component')).toBeInTheDocument();
	});

	test('should have CreditCard component', () => {
		render(<CardDetailsAndActions card={card} />);
		expect(screen.getByTestId('credit-card-component')).toBeInTheDocument();
	});

	test('should show user role', () => {
		render(<CardDetailsAndActions card={card} />);
		expect(screen.getByText('Master Admin')).toBeInTheDocument();
	});

	test('should show card details amount', () => {
		render(<CardDetailsAndActions card={card} />);
		expect(screen.getByText('SGD 1,000.00')).toBeInTheDocument();
	});

	test('should card actions if the card is activated', () => {
		render(<CardDetailsAndActions card={card} />);
		expect(screen.getByTestId('credit-actions-component')).toBeInTheDocument();
	});

	test('should card actions if the card is not', () => {
		const cardData = {
			...card,
			cardStatus: 'cardStatus',
		};
		render(<CardDetailsAndActions card={cardData} />);
		expect(screen.queryByTestId('credit-actions-component')).not.toBeInTheDocument();
	});
});
