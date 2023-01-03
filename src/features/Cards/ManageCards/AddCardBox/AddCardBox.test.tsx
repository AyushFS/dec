import React from 'react';
import { render, screen } from '@testing-library/react';
import AddCardBox from './AddCardBox';

describe('AddCardBox component', () => {
	test('renders AddCardBox component', () => {
		render(<AddCardBox />);
		expect(screen.getByTestId('add-card-box-component')).toBeInTheDocument();
	});
});
