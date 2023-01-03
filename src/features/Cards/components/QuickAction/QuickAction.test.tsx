import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import QuickAction from './QuickAction';

const mockOnQuickActionClick = jest.fn();

describe('QuickAction component', () => {
	test('renders QuickAction component', () => {
		render(<QuickAction icon="unlock" title="Lock Card" />);
		expect(screen.getByTestId('quick-action-component')).toBeInTheDocument();
		expect(screen.getByTestId('fs-icon')).toBeInTheDocument();
		expect(screen.getByTestId('fs-icon')).toHaveStyle('width: 24px; height: 24px;');
		expect(screen.getByText('Lock Card')).toBeInTheDocument();
	});

	test('renders QuickAction component with onClick', async () => {
		render(<QuickAction icon="unlock" title="Lock Card" onClick={mockOnQuickActionClick} />);
		await fireEvent.click(screen.getByTestId('quick-action-component'));
		expect(mockOnQuickActionClick).toHaveBeenCalledTimes(1);
	});
});
