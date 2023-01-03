import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import { ObjectWithAny, ObjectWithString } from '../../common/interface/general';

describe('Card component', () => {
	test('renders Card component', () => {
		render(<Card />);
		expect(screen.getByTestId('card')).toBeInTheDocument();
	});

	[
		[null, '6'],
		[undefined, '6'],
		['a-string', '6'],
		['10', '10'],
	].forEach((value) => {
		test(`should set padding for Card to ${value[1]} if cardPadding prop is ${value[0]}`, () => {
			const attribtues: ObjectWithString = {
				cardPadding: value[0] as string,
			};
			render(<Card {...attribtues} />);
			const cardElement = screen.getByTestId('card');
			expect(cardElement).toHaveClass(`p-${value[1]}`);
		});

		test(`should set padding for card_content to ${value[1]} if contentPadding prop is ${value[0]}`, () => {
			const attribtues: ObjectWithString = {
				contentPadding: value[0] as string,
			};
			render(<Card {...attribtues} />);
			const cardContentElement = screen.getByTestId('card-content');
			expect(cardContentElement).toHaveClass(`p-${value[1]}`);
		});
	});

	it('should set border radius for Card if borderRadius prop is set', () => {
		const attribtues: ObjectWithAny = {
			borderRadius: 10,
		};
		render(<Card {...attribtues} />);
		const cardElement = screen.getByTestId('card');
		expect(cardElement).toHaveStyle('border-radius: 10px');
	});

	it('should not set border radius for Card if borderRadius prop is not set', () => {
		render(<Card />);
		const cardElement = screen.getByTestId('card');
		expect(getComputedStyle(cardElement).borderRadius).toBe('');
	});

	it('should set icon for Card if icon prop is set', () => {
		const attribtues: ObjectWithString = {
			icon: 'https://via.placeholder.com/150',
		};
		render(<Card {...attribtues} />);
		const cardIconElement = screen.getByTestId('card-icon');
		expect(cardIconElement).toBeInTheDocument();
	});

	it('should not set icon for Card if icon prop is not set', () => {
		render(<Card />);
		const cardIconElement = screen.queryByTestId('card-icon');
		expect(cardIconElement).toBeNull();
	});
});
