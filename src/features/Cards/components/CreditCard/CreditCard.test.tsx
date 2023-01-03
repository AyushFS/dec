import React from 'react';
import { render, screen } from '@testing-library/react';
import CreditCard from './CreditCard';
import { card } from '../../ManageCards/mocks/card';
import cardSecureInfo from '../../ManageCards/mocks/cardSecureInfo';

jest.mock('../../../../common/utilities/common', () => ({
	generateUniqueId: () => '123',
}));

jest.mock('../../utils', () => ({
	...jest.requireActual('../../utils'),
	maskCardNumber: () => '•••• •••• •••• 1234',
	splitCardNumber: () => '1111 2222 3333 4444',
}));

describe('CreditCard component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('renders CreditCard component', () => {
		render(<CreditCard card={card} />);
		expect(screen.getByTestId('credit-card-component')).toBeInTheDocument();
		expect(screen.getByText('Valid Thru')).toBeInTheDocument();
		expect(screen.getByText('CVV')).toBeInTheDocument();
		expect(screen.getByTestId('credit-card-details')).toHaveStyle('transform: scale(1)');
	});

	test('should execute functions to set scale', () => {
		const getElementByIdMock = jest.fn();
		const querySelectordMock = jest.fn();
		document.getElementById = getElementByIdMock;
		document.querySelector = querySelectordMock;
		render(<CreditCard card={card} />);
		expect(getElementByIdMock).toBeCalled();
		expect(getElementByIdMock).toBeCalledTimes(1);
		expect(querySelectordMock).toBeCalled();
		expect(querySelectordMock).toBeCalledTimes(1);
		expect(getElementByIdMock).toBeCalledWith('card-unique-id-123');
	});

	describe('Name on Card', () => {
		test('should not show card name when cardSecureInfo doesn not exist', () => {
			render(<CreditCard card={card} />);
			expect(screen.queryByTestId('credit-card-name')).not.toBeInTheDocument();
		});

		test('should show card name when cardSecureInfo exists', () => {
			render(<CreditCard card={card} cardSecureInfo={cardSecureInfo} />);
			expect(screen.getByTestId('credit-card-name')).toBeInTheDocument();
		});

		test('should split card name and only show initial for last name when cardSecureInfo exists', () => {
			render(<CreditCard card={card} cardSecureInfo={cardSecureInfo} />);
			expect(screen.getByTestId('credit-card-name')).toHaveTextContent('Some N.');
		});
	});

	describe('Valid Thru', () => {
		test('should render Valid Thru in MM/YY format when cardSecureInfo exists', () => {
			render(<CreditCard card={card} cardSecureInfo={cardSecureInfo} />);
			expect(screen.getByText('Valid Thru')).toBeInTheDocument();
			expect(screen.getByTestId('credit-card-expiry')).toBeInTheDocument();
			expect(screen.getByTestId('credit-card-expiry')).toHaveTextContent('08 / 27');
		});

		test('should render Valid Thru in masked format when cardSecureInfo does not exist', () => {
			render(<CreditCard card={card} />);
			expect(screen.getByText('Valid Thru')).toBeInTheDocument();
			expect(screen.getByTestId('credit-card-expiry')).toBeInTheDocument();
			expect(screen.getByTestId('credit-card-expiry')).toHaveTextContent('•• / ••');
		});
	});

	describe('CVV', () => {
		test('should render CVV in masked format when cardSecureInfo doesn not exist', () => {
			render(<CreditCard card={card} />);
			expect(screen.getByText('CVV')).toBeInTheDocument();
			expect(screen.getByTestId('credit-card-cvv')).toBeInTheDocument();
			expect(screen.getByTestId('credit-card-cvv')).toHaveTextContent('•••');
		});

		it('should render CVV in number format when cardSecureInfo exists', () => {
			render(<CreditCard card={card} cardSecureInfo={cardSecureInfo} />);
			expect(screen.getByText('CVV')).toBeInTheDocument();
			expect(screen.getByTestId('credit-card-cvv')).toBeInTheDocument();
			expect(screen.getByTestId('credit-card-cvv')).toHaveTextContent('123');
		});
	});

	describe('Credit Card image', () => {
		test('renders CreditCard component with card not locked', () => {
			const cardData = {
				...card,
				islocked: false,
			};
			render(<CreditCard card={cardData} />);
			expect(screen.queryByTestId('credit-card-image')).not.toHaveClass('is-locked');
		});

		test('renders CreditCard component with card locked', () => {
			const cardData = {
				...card,
				isLocked: true,
			};
			render(<CreditCard card={cardData} />);
			expect(screen.getByTestId('credit-card-image')).toHaveClass('is-locked');
		});
	});

	describe('Card Number', () => {
		test('should render card number when cardSecureInfo exists', () => {
			render(<CreditCard card={card} cardSecureInfo={cardSecureInfo} />);
			expect(screen.getByTestId('credit-card-number')).toBeInTheDocument();
			expect(screen.getByTestId('credit-card-number')).toHaveTextContent('1111222233334444');
		});

		test('should render masked card number when cardSecureInfo does not exists', () => {
			render(<CreditCard card={card} />);
			expect(screen.getByTestId('credit-card-number')).toBeInTheDocument();
			expect(screen.getByTestId('credit-card-number')).toHaveTextContent('••••••••••••1234');
		});
	});
});
