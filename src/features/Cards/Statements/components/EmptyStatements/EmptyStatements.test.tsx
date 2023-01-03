import React from 'react';
import { render, screen } from '@testing-library/react';
import EmptyStatements from './EmptyStatements';

describe('EmptyStatements component', () => {
	test('renders EmptyStatements component', () => {
		render(<EmptyStatements />);
		expect(screen.getByTestId('empty-statements-component')).toBeInTheDocument();
	});
});
