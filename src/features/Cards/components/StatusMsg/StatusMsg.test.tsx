import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusMsg from './StatusMsg';

describe('StatusMsg component', () => {
	test('renders StatusMsg component', () => {
		render(<StatusMsg size={10} title="message-title" icon="some-icon" classes="some-class" />);
		expect(screen.getByTestId('status-msg-component')).toBeInTheDocument();
		expect(screen.getByTestId('status-msg-component')).toHaveClass('some-class');
		expect(screen.getByTestId('fs-icon')).toBeInTheDocument();
		expect(screen.getByTestId('fs-icon').innerHTML).toBe('some-icon');
		expect(screen.getByText('message-title')).toBeInTheDocument();
	});
});
