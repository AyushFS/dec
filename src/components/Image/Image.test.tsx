import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from './Image';

describe('Image component', () => {
	test('renders Image component', () => {
		render(<Image src="https://via.placeholder.com/350x150" />);
		const element = screen.getByRole('img');
		expect(element).toBeInTheDocument();
	});

	test('should have css class when responsive is set to true', () => {
		render(<Image src="https://via.placeholder.com/350x150" responsive />);
		const element = screen.getByRole('img');
		expect(element).toHaveClass('img-fluid');
	});
});
