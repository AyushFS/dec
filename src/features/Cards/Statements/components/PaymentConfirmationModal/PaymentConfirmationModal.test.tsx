import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import PaymentConfirmationModal from './PaymentConfirmationModal';

describe('PaymentConfirmationModal component', () => {
	test('renders PaymentConfirmationModal component', () => {
		render(<PaymentConfirmationModal />);
		expect(screen.getByTestId('payment-confirmation-modal-component')).toBeInTheDocument();
	});

	test('renders PaymentConfirmationModal component with children', () => {
		render(
			<PaymentConfirmationModal>
				<div data-testid="payment-confirmation-modal-children" />
			</PaymentConfirmationModal>
		);
		expect(screen.getByTestId('payment-confirmation-modal-children')).toBeInTheDocument();
	});

	test('should toggle modal when clicked on children', () => {
		render(<PaymentConfirmationModal>children</PaymentConfirmationModal>);
		expect(screen.getByTestId('modal-component')).toBeInTheDocument();
		act(() => {
			screen.getByText('children').click();
		});
		expect(screen.queryByTestId('modal-component')).not.toBeInTheDocument();
	});

	describe('onClose prop', () => {
		test('should call onClose when close button is clicked', () => {
			const mockOnClose = jest.fn();
			render(<PaymentConfirmationModal onClose={mockOnClose} />);
			act(() => {
				screen.getByTestId('close-modal-button').click();
			});
			expect(mockOnClose).toHaveBeenCalled();
			expect(mockOnClose).toHaveBeenCalledTimes(1);
		});

		test('should not call onClose when onClose prop is not passed and close button is clicked', () => {
			const mockOnClose = jest.fn();
			render(<PaymentConfirmationModal />);
			act(() => {
				screen.getByTestId('close-modal-button').click();
			});
			expect(mockOnClose).not.toHaveBeenCalled();
		});
	});

	describe('onButtonClick prop', () => {
		test('should call onButtonClick when button is clicked', () => {
			const mockOnButtonClick = jest.fn();
			render(<PaymentConfirmationModal onButtonClick={mockOnButtonClick} />);
			act(() => {
				screen.getByTestId('confirmation-button').click();
			});
			expect(mockOnButtonClick).toHaveBeenCalled();
			expect(mockOnButtonClick).toHaveBeenCalledTimes(1);
		});

		test('should not call onButtonClick when onButtonClick prop is not passed and button is clicked', () => {
			const mockOnButtonClick = jest.fn();
			render(<PaymentConfirmationModal />);
			act(() => {
				screen.getByTestId('confirmation-button').click();
			});
			expect(mockOnButtonClick).not.toHaveBeenCalled();
		});
	});
});
