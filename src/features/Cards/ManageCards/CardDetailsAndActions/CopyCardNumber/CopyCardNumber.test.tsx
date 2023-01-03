import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { card } from '../../mocks/card';
import CopyCardNumber from './CopyCardNumber';
import { CardDetails } from '../../interface';
import { ManageCardsProvider } from '../../ManageCardsProvider';

const mockSetSnackbar = jest.fn();
jest.mock('../../../../GlobalState/useGlobalState', () => () => {
	return {
		setLoader: jest.fn(),
		setSnackbar: mockSetSnackbar,
	};
});
jest.mock('../../../../../common/utilities/common', () => {
	return {
		copyTextToClipboard: jest.fn(),
	};
});

const mockSetCardSecureInfo = jest.fn();
let mockManageCardsData = {};
jest.mock('../../UseManageCards', () => ({
	default: () => mockManageCardsData,
	__esModule: true,
}));

const queryClient = new QueryClient();

const renderComponent = (cardData?: CardDetails) => {
	return render(
		<QueryClientProvider client={queryClient}>
			<ManageCardsProvider>
				<CopyCardNumber card={{ ...card, ...cardData }} />
			</ManageCardsProvider>
		</QueryClientProvider>
	);
};

describe('CopyCardNumber component', () => {
	beforeEach(() => {
		mockManageCardsData = {
			cardSecureInfo: null as any,
			setCardSecureInfo: mockSetCardSecureInfo,
		};
		jest.clearAllMocks();
	});

	test('renders CopyCardNumber component', () => {
		renderComponent();
		expect(screen.getByTestId('quick-action-component')).toBeInTheDocument();
		expect(screen.getByTestId('fs-icon')).toBeInTheDocument();
	});

	// test('should call necessary functions on click', async () => {
	// 	renderComponent();
	// 	await act(() => {
	// 		userEvent.click(screen.getByTestId('fs-icon'));
	// 	});
	// 	await waitFor(() => {
	// 		expect(mockSetSnackbar).toHaveBeenCalled();
	// 	});
	// 	await waitFor(() => {
	// 		expect(mockSetSnackbar).toHaveBeenCalledWith({
	// 			message: 'manage_cards.card_details.card_actions.copied_to_clipboard',
	// 		});
	// 	});
	// 	await waitFor(() => {
	// 		expect(mockSetCardSecureInfo).toBeCalledTimes(1);
	// 	});
	// });

	test('should call setCardSecureInfo when component is unmounted', async () => {
		const { unmount } = renderComponent();
		unmount();
		expect(mockSetCardSecureInfo).toBeCalledTimes(1);
		expect(mockSetCardSecureInfo).toBeCalledWith(null);
	});
});
