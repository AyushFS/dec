import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';
import { ButtonSizes, ButtonTypes, BUTTON_COLORS, BUTTON_SIZES } from './constants';
import { ObjectWithString } from '../../common/interface/general';

const mockCallBack = jest.fn();

describe('Button component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('renders Button component', () => {
		render(<Button>click me!</Button>);
		const buttonElement = screen.getByText(/click me!/i);
		expect(buttonElement).toBeInTheDocument();
	});

	test('should disable the button when disable is true', async () => {
		render(
			<Button disabled onClick={mockCallBack}>
				click me!
			</Button>
		);
		const buttonElement = screen.getByText(/click me!/i);
		expect(buttonElement).toHaveAttribute('disabled');
		await fireEvent.click(buttonElement);
		expect(mockCallBack).toBeCalledTimes(0);
	});

	test('should not disable the button when disable is false', async () => {
		render(
			<Button disabled={false} onClick={mockCallBack}>
				click me!
			</Button>
		);
		const buttonElement = screen.getByText(/click me!/i);
		expect(buttonElement).not.toHaveAttribute('disabled');
		await fireEvent.click(buttonElement);
		expect(mockCallBack).toBeCalledTimes(1);
	});

	test('should not disable the button when disable is not set', async () => {
		render(<Button onClick={mockCallBack}>click me!</Button>);
		const buttonElement = screen.getByText(/click me!/i);
		expect(buttonElement).not.toHaveAttribute('disabled');
		await fireEvent.click(buttonElement);
		expect(mockCallBack).toBeCalledTimes(1);
	});

	test('should set the tabindex attribute to taxIndex value when tabindex is passed and button is not disabled', async () => {
		render(<Button tabindex={2}>click me!</Button>);
		const buttonElement = screen.getByText(/click me!/i);
		expect(buttonElement.getAttribute('tabindex')).toBe('2');
	});

	test('should set the tabindex attribute to -1 when button is disabled', async () => {
		render(
			<Button disabled tabindex={2}>
				click me!
			</Button>
		);
		const buttonElement = screen.getByText(/click me!/i);
		expect(buttonElement.getAttribute('tabindex')).toBe('-1');
	});

	test('should set the tabindex attribute to 0 when tabIndex is not set', async () => {
		render(<Button>click me!</Button>);
		const buttonElement = screen.getByText(/click me!/i);
		expect(buttonElement.getAttribute('tabindex')).toBe('0');
	});

	[
		['button', 'button'],
		['submit', 'submit'],
		['reset', 'reset'],
		[null, 'button'],
		[undefined, 'button'],
		[10, 'button'],
		['something else', 'button'],
	].forEach((data) => {
		test(`should set button type as "${data[1]}" when type is "${data[0]}"`, () => {
			render(<Button type={data[0] as ButtonTypes}>click me!</Button>);
			const buttonElement = screen.getByText(/click me!/i);
			expect(buttonElement.getAttribute('type')).toBe(data[1]);
		});
	});

	[
		['block', 'btn--block'],
		['link', 'btn--link'],
		['flat', 'btn--flat'],
		['filter', 'btn--filter'],
		['hovered', 'is-hovered'],
		['active', 'is-active'],
		['disabled', 'button'],
	].forEach((data) => {
		test(`should assign ${data[1]} class when ${data[0]} is true`, () => {
			const attribtues: ObjectWithString = {
				[data[0]]: data[1],
			};
			// attribtues[data[0]] = data[1];
			render(<Button {...attribtues}>click me!</Button>);
			const buttonElement = screen.getByText(/click me!/i);
			expect(buttonElement).toHaveClass(data[1]);
		});
	});

	[
		['primary', 'btn--primary'],
		['secondary', 'btn--secondary'],
	].forEach((value) => {
		test(`should assign ${value[1]} class when color is ${value[0]}`, () => {
			const attribtues: ObjectWithString = {
				color: value[0],
			};
			render(<Button {...attribtues}>click me!</Button>);
			const buttonElement = screen.getByText(/click me!/i);
			expect(buttonElement).toHaveClass(value[1]);
		});
	});

	[
		[null, ''],
		[undefined, ''],
		['some-other-color', ''],
	].forEach((value) => {
		test(`should not assign the color class when color is ${value[0]}`, () => {
			const attribtues: ObjectWithString = {
				color: value[0] as string,
			};
			render(<Button {...attribtues}>click me!</Button>);
			const buttonElement = screen.getByText(/click me!/i);
			BUTTON_COLORS.forEach((size) => {
				expect(buttonElement).not.toHaveClass(`btn--${size}`);
			});
		});
	});

	[
		['default', 'btn--default'],
		['small', 'btn--small'],
		['large', 'btn--large'],
	].forEach((value) => {
		test(`should assign ${value[1]} class when size is ${value[0]}`, () => {
			const attribtues: ObjectWithString = {
				size: value[0],
			};
			render(<Button {...attribtues}>click me!</Button>);
			const buttonElement = screen.getByText(/click me!/i);
			expect(buttonElement).toHaveClass(value[1]);
		});
	});

	[
		[null, ''],
		[undefined, ''],
		['some-other-size', ''],
	].forEach((value) => {
		test(`should not assign the size class when size is ${value[0]}`, () => {
			const attribtues: ObjectWithString = {
				size: value[0] as ButtonSizes,
			};
			render(<Button {...attribtues}>click me!</Button>);
			const buttonElement = screen.getByText(/click me!/i);
			BUTTON_SIZES.forEach((size) => {
				expect(buttonElement).not.toHaveClass(`btn--${size}`);
			});
		});
	});

	test('should trigger onClick event when clicking the button', async () => {
		render(<Button onClick={mockCallBack}>click me!</Button>);
		const buttonElement = screen.getByText(/click me!/i);
		await fireEvent.click(buttonElement);
		expect(mockCallBack).toBeCalledTimes(1);
	});
});
