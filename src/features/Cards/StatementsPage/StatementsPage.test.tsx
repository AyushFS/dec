import React from 'react';
import { screen, render } from '@testing-library/react';
import StatementsPage from './StatementsPage';

jest.mock('../../../features/Cards/Statements/Statements', () => () => <div data-testid="statements-component" />);

describe('StatementsPage Page component', () => {
	test('renders StatementsPage page component', () => {
		render(<StatementsPage />);
		expect(screen.getByTestId('statements-page')).toBeInTheDocument();
		expect(screen.getByTestId('statements-component')).toBeInTheDocument();
	});
});
