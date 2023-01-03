import React from 'react';
import { render, screen } from '@testing-library/react';
import Logo, { LogoTypes } from './Logo';

describe('Logo component', () => {
	test('renders Logo component with image', () => {
		render(<Logo type={LogoTypes.fs} />);
		const element = screen.getByRole('img');
		expect(element).toBeInTheDocument();
		expect(element.getAttribute('src')).toBe('logo-fs.svg');
	});
	test('should use default logo if logo type prop is not set', () => {
		render(<Logo />);
		expect(screen.getByRole('img').getAttribute('src')).toBe('logo-icon.svg');
	});
});
