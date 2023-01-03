import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Snackbar from './Snackbar';
import { IconTypes } from '../FsIcon/constants';
import FsIcon from '../FsIcon';

describe('Snackbar component', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});
	afterEach(() => {
		jest.useRealTimers();
	});

	test('renders Snackbar component', () => {
		render(<Snackbar message="Snackbar Message" />);
		expect(screen.getByTestId('snackbar-component')).toBeInTheDocument();
		expect(screen.getByText('Snackbar Message')).toBeInTheDocument();
		expect(screen.getByTestId('fs-icon')).toBeInTheDocument();
	});

	test('renders Snackbar component with custom icon', () => {
		render(<Snackbar message="Snackbar Message" icon={<FsIcon type={IconTypes.icon}>tag</FsIcon>} />);
		expect(screen.getByTestId('fs-icon')).toBeInTheDocument();
		expect(screen.getByTestId('fs-icon')).toHaveClass('fs-icon--tag');
	});

	test('onAction callback is called when close button is clicked', () => {
		const onAction = jest.fn();
		render(<Snackbar message="Snackbar Message" onAction={onAction} />);
		expect(onAction).not.toHaveBeenCalled();
		screen.getByTestId('snackbar-trigger').click();
		expect(onAction).toHaveBeenCalledTimes(1);
	});

	test('onSnackbarDismiss callback is called when close button is clicked', async () => {
		const onSnackbarDismiss = jest.fn();
		render(<Snackbar message="Snackbar Message" onSnackbarDismiss={onSnackbarDismiss} />);
		expect(onSnackbarDismiss).not.toHaveBeenCalled();
		await screen.getByTestId('snackbar-trigger').click();
		expect(onSnackbarDismiss).toHaveBeenCalledTimes(1);
	});

	test('should hide snackbar when close button is clicked', async () => {
		render(<Snackbar message="Snackbar Message" />);
		expect(screen.getByTestId('snackbar-component')).toBeInTheDocument();
		await screen.getByTestId('snackbar-trigger').click();
		expect(screen.queryByTestId('snackbar-component')).not.toBeInTheDocument();
	});

	test('should hide snackbar after timeout', async () => {
		const onSnackbarDismiss = jest.fn();
		render(<Snackbar message="Snackbar Message" timeout={1000} onSnackbarDismiss={onSnackbarDismiss} />);
		expect(screen.getByTestId('snackbar-component')).toBeInTheDocument();
		act(() => {
			jest.advanceTimersByTime(999);
		});
		expect(screen.getByTestId('snackbar-component')).toBeInTheDocument();
		expect(onSnackbarDismiss).toHaveBeenCalledTimes(0);
		act(() => {
			jest.advanceTimersByTime(1);
		});
		expect(screen.queryByTestId('snackbar-component')).not.toBeInTheDocument();
		expect(onSnackbarDismiss).toHaveBeenCalledTimes(1);
	});
});
