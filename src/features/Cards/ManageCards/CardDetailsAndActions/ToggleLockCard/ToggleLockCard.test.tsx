import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { card } from '../../mocks/card';
import ToggleLockCard from './ToggleLockCard';
import { CardDetails } from '../../interface';

const queryClient = new QueryClient();
describe('ToggleLockCard component', () => {
	const renderComponent = (cardData?: CardDetails) => {
		return render(
			<QueryClientProvider client={queryClient}>
				<ToggleLockCard card={{ ...card, ...cardData }} />
			</QueryClientProvider>
		);
	};
	test('renders ToggleLockCard component', () => {
		renderComponent();
		expect(screen.getByTestId('quick-action-component')).toBeInTheDocument();
		expect(screen.getByTestId('fs-icon')).toBeInTheDocument();
	});

	test('renders ToggleLockCard component with lock text', () => {
		renderComponent({
			isLocked: false,
		} as CardDetails);
		expect(screen.getByTestId('quick-action-component')).toHaveTextContent(
			'manage_cards.card_details.card_actions.lock_card'
		);
	});

	test('renders ToggleLockCard component with unlock text', () => {
		renderComponent({
			isLocked: true,
		} as CardDetails);
		expect(screen.getByTestId('quick-action-component')).toHaveTextContent(
			'manage_cards.card_details.card_actions.unlock_card'
		);
	});
});
