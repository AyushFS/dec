import React from 'react';
import { act, render, screen } from '@testing-library/react';
import UnderstandBill from './UnderstandBill';

describe('UnderstandBill component', () => {
	test('renders UnderstandBill component', () => {
		render(<UnderstandBill />);
		expect(screen.getByTestId('understanding-bill-component')).toBeInTheDocument();
	});

	test('should show the modal when clicked on children', () => {
		render(<UnderstandBill>Click me</UnderstandBill>);
		act(() => {
			screen.getByText('Click me').click();
		});
		expect(screen.getByTestId('modal-component')).toBeInTheDocument();
	});

	test('should render title', () => {
		render(<UnderstandBill>Click me</UnderstandBill>);
		act(() => {
			screen.getByText('Click me').click();
		});
		expect(screen.getByText('statements.understand_bill_modal.title')).toBeInTheDocument();
	});

	test('should render buttons', () => {
		render(<UnderstandBill>Click me</UnderstandBill>);
		act(() => {
			screen.getByText('Click me').click();
		});
		expect(screen.getByText('statements.understand_bill_modal.ok_button')).toBeInTheDocument();
		expect(screen.getByText('statements.understand_bill_modal.cancel_button')).toBeInTheDocument();
	});

	[
		['statements.understand_bill_modal.ok_button', 'Ok Button'],
		['statements.understand_bill_modal.cancel_button', 'Cancel Button'],
	].forEach((buttons) => {
		test(`should hide the modal when ${buttons[1]} is clicked`, () => {
			render(<UnderstandBill>Click me</UnderstandBill>);
			act(() => {
				screen.getByText('Click me').click();
			});
			expect(screen.getByTestId('modal-component')).toBeInTheDocument();
			act(() => {
				screen.getByText(buttons[0]).click();
			});
			expect(screen.queryByTestId('modal-component')).not.toBeInTheDocument();
		});
	});

	[
		'due_date',
		'billing_cycle',
		'total_amount_due',
		'minimum_due',
		'utilisatin_amount',
		'rollover_interest_fee',
		'late_fee',
	].forEach((point) => {
		test(`should show title and description for ${point}`, () => {
			render(<UnderstandBill>Click me</UnderstandBill>);
			act(() => {
				screen.getByText('Click me').click();
			});
			expect(screen.getByText(`statements.understand_bill_modal.${point}.title:`)).toBeInTheDocument();
			expect(screen.getByText(`statements.understand_bill_modal.${point}.description`)).toBeInTheDocument();
		});
	});
});
