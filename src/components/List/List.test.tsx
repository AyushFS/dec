import React from 'react';
import { render, screen } from '@testing-library/react';
import List from './List';

const mockOnSelectCallback = jest.fn();
const listItems: any = [
	{
		id: 1,
		label: 'Account',
		prepend: 'prepend',
	},
	{
		id: 2,
		label: 'Settings',
		prepend: 'append',
	},
];

describe('List component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('renders List component', () => {
		render(<List items={listItems} />);
		expect(screen.getByTestId('list-component')).toBeInTheDocument();
		expect(screen.getAllByTestId('tree-item-component')).toHaveLength(2);
	});

	test('should call when onSelectCallback is defined and tree item is clicked', () => {
		render(<List items={listItems} onSelectCallback={mockOnSelectCallback} />);
		screen.getAllByTestId('tree-item-component')[0].click();
		expect(mockOnSelectCallback).toHaveBeenCalledTimes(1);
	});
});
