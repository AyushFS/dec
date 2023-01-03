import React from 'react';
import { render, screen } from '@testing-library/react';
import UnderstandCardSpending from './UnderstandCardSpending';
import ManageCardLimitFooter from '../ManageCardLimitFooter';

describe('UnderstandCardSpending component', () => {
	const renderComponent = (props: { onConsentUpdateLimit?: () => void; onClose?: () => void } = {}) =>
		render(
			<UnderstandCardSpending
				footerComponent={ManageCardLimitFooter}
				onConsentUpdateLimit={props.onConsentUpdateLimit}
				onClose={props.onClose}
			/>
		);

	test('renders UnderstandCardSpending component', () => {
		renderComponent();
		expect(screen.getByTestId('understanding-card-spending-component')).toBeInTheDocument();
	});

	test('should trigger onClose when click on cancel button', () => {
		const onClose = jest.fn();
		renderComponent({ onClose });
		screen.getByText('manage_cards.manage_limit.cancel_button').click();
		expect(onClose).toBeCalled();
	});

	test('should trigger onUpdateLimit when click on update limit button', () => {
		const onConsentUpdateLimit = jest.fn();
		renderComponent({ onConsentUpdateLimit });
		screen.getByText('manage_cards.manage_limit.update_limit_button').click();
		expect(onConsentUpdateLimit).toBeCalled();
	});
});
