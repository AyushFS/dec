import React from 'react';
import { render, screen } from '@testing-library/react';
import FsIcon from './FsIcon';
import { IconTypes } from './constants';

describe('FsIcon component', () => {
	test('renders FsIcon component', () => {
		render(
			<FsIcon size={24} type={IconTypes.icon}>
				home
			</FsIcon>
		);
		const element = screen.getByTestId('fs-icon');
		expect(element).toBeInTheDocument();
		expect(element).toHaveClass('fs-icon');
		expect(element).toHaveClass('fs-icon--home');
	});

	test('should render Material Icon', () => {
		render(
			<FsIcon size={24} type={IconTypes.material}>
				face
			</FsIcon>
		);
		const element = screen.getByTestId('fs-icon');
		expect(element).toHaveClass('material-icons');
	});

	test('should render Material Design Icon', () => {
		render(
			<FsIcon size={24} type={IconTypes.mdi}>
				mdi-menu
			</FsIcon>
		);
		const element = screen.getByTestId('fs-icon');
		expect(element).toHaveClass('mdi mdi-menu');
	});

	test('should render FontAwesome Icon', () => {
		render(
			<FsIcon size={24} type={IconTypes.fontawesome}>
				fa-address-book
			</FsIcon>
		);
		const element = screen.getByTestId('fs-icon');
		expect(element).toHaveClass('fa fa-address-book');
	});

	test('should render SVG Icon', () => {
		render(
			<FsIcon size={24} type={IconTypes.svg}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 100 100"
					fill="none"
					stroke="#000"
					strokeWidth="4"
					aria-label="Chicken"
				>
					<path d="M48.1 34C22.1 32 1.4 51 2.5 67.2c1.2 16.1 19.8 17 29 17.8H89c15.7-6.6 6.3-18.9.3-20.5A28 28 0 0073 41.7c-.5-7.2 3.4-11.6 6.9-15.3 8.5 2.6 8-8 .8-7.2.6-6.5-12.3-5.9-6.7 2.7l-3.7 5c-6.9 5.4-10.9 5.1-22.2 7zM48.1 34c-38 31.9 29.8 58.4 25 7.7M70.3 26.9l5.4 4.2" />
				</svg>
			</FsIcon>
		);
		const element = screen.getByTestId('fs-icon');
		expect(element.innerHTML).toContain('Chicken');
	});

	test('should render Image Icon', () => {
		render(
			<FsIcon size={24} type={IconTypes.img}>
				https://dummyurl.com/image.png
			</FsIcon>
		);
		const element = screen.getByTestId('fs-icon');
		expect(element.innerHTML).toContain('img');
	});

	test('should choose default size if no size is provided', () => {
		render(<FsIcon>home</FsIcon>);
		const element = screen.getByTestId('fs-icon');
		expect(element).toHaveStyle('width: 16px; height: 16px;');
	});

	test('should have class for left', () => {
		render(<FsIcon left>home</FsIcon>);
		const element = screen.getByTestId('fs-icon');
		expect(element).toHaveClass('fs-icon--left');
	});

	test('should have class for right', () => {
		render(<FsIcon right>home</FsIcon>);
		const element = screen.getByTestId('fs-icon');
		expect(element).toHaveClass('fs-icon--right');
	});

	test('should have class for disabled', () => {
		render(<FsIcon disabled>home</FsIcon>);
		const element = screen.getByTestId('fs-icon');
		expect(element).toHaveClass('fs-icon--disabled');
		expect(element).toHaveAttribute('disabled');
	});
});
