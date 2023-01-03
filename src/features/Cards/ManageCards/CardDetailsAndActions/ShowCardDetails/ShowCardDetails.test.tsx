import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { card } from '../../mocks/card';
import ShowCardDetails from './ShowCardDetails';
import { CardDetails } from '../../interface';
import { ManageCardsProvider } from '../../ManageCardsProvider';
import { GlobalStateProvider } from '../../../../GlobalState/GlobalStateProvider';

const mockSetShowCardSecureInfo = jest.fn();
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
			<GlobalStateProvider>
				<ManageCardsProvider>
					<ShowCardDetails card={{ ...card, ...cardData }} />
				</ManageCardsProvider>
			</GlobalStateProvider>
		</QueryClientProvider>
	);
};

describe('ShowCardDetails component', () => {
	beforeEach(() => {
		mockManageCardsData = {
			cardSecureInfo: null as any,
			setCardSecureInfo: mockSetCardSecureInfo,
			showCardSecureInfo: false,
			setShowCardSecureInfo: mockSetShowCardSecureInfo,
		};
		jest.clearAllMocks();
	});

	test('renders ShowCardDetails component', async () => {
		renderComponent();
		expect(screen.getByTestId('quick-action-component')).toBeInTheDocument();
		await fireEvent.click(screen.getByTestId('quick-action-component'));
	});

	test('should call setShowCardSecureInfo and setCardSecureInfo when component is unmounted', async () => {
		const { unmount } = renderComponent();
		unmount();
		expect(mockSetShowCardSecureInfo).toBeCalledTimes(1);
		expect(mockSetShowCardSecureInfo).toBeCalledWith(false);
		expect(mockSetCardSecureInfo).toBeCalledTimes(1);
		expect(mockSetCardSecureInfo).toBeCalledWith(null);
	});
});
