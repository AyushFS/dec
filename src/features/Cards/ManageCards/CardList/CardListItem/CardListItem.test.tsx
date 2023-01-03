import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CARD_STATUS } from '../../../../../common/constant/enum/GeneralEnum';
import { GlobalStateProvider } from '../../../../GlobalState/GlobalStateProvider';
import card from '../../mocks/card';
import CardListItem from './CardListItem';

jest.mock('../../../components/CreditCard/CreditCard', () => () => <div data-testid="credit-card-component" />);

const mockonCardClick = jest.fn();

const queryClient = new QueryClient();

describe('CardListItem component', () => {
	test('renders CardListItem component', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<CardListItem card={card} onCardClick={mockonCardClick} />
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByTestId('card-list-item-component')).toBeInTheDocument();
		expect(screen.getByTestId('credit-card-component')).toBeInTheDocument();
	});

	test('should show active status', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<CardListItem card={card} onCardClick={mockonCardClick} />
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getAllByText('manage_cards.card_status.active').length).toBe(2);
		expect(screen.getAllByText('manage_cards.card_status.active')[1]).toBeInTheDocument();
	});

	test('should show locked status', () => {
		const props = {
			card: {
				...card,
				isLocked: true,
			},
			onCardClick: mockonCardClick,
		};
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<CardListItem {...props} />
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getAllByText('manage_cards.card_status.locked').length).toBe(2);
		expect(screen.getAllByText('manage_cards.card_status.locked')[1]).toBeInTheDocument();
	});

	test('should show activation pending status', () => {
		const props = {
			card: {
				...card,
				cardStatus: CARD_STATUS.INACTIVE,
			},
			onCardClick: mockonCardClick,
		};
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<CardListItem {...props} />
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getAllByText('manage_cards.card_status.activation_pending').length).toBe(2);
		expect(screen.getAllByText('manage_cards.card_status.activation_pending')[1]).toBeInTheDocument();
	});

	test('should show last 4 digits of card number', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<CardListItem card={card} onCardClick={mockonCardClick} />
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByText('(.... 1234)')).toBeInTheDocument();
	});

	test('should show limit and spent currency in proper format with currency code', () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<CardListItem card={card} onCardClick={mockonCardClick} />
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByText('SGD 9,000.00')).toBeInTheDocument();
		expect(screen.getByText('/ 10,000.00')).toBeInTheDocument();
	});

	test('should show Master Admin text', () => {
		const props = {
			card: {
				...card,
				cardType: 'CREDIT-CARD-MAIN',
			},
			onCardClick: mockonCardClick,
		};
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<CardListItem {...props} />
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		expect(screen.getByText('Master Admin')).toBeInTheDocument();
	});

	test('should call the onCardClick prop function when row is clicked', async () => {
		render(
			<QueryClientProvider client={queryClient}>
				<GlobalStateProvider>
					<CardListItem card={card} onCardClick={mockonCardClick} />
				</GlobalStateProvider>
			</QueryClientProvider>
		);
		await fireEvent.click(screen.getByTestId('card-list-item-trigger'));
		expect(mockonCardClick).toHaveBeenCalledTimes(1);
	});
});
