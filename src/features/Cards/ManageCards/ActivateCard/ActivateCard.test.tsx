import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/lib/node';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthContext from '../../../Auth/AuthProvider';
import { authContextValue } from '../AddCard/steps/UserDetailsForm/mocks/testdata';
import ActivateCard from './ActivateCard';
import directorOptions from './mocks/fixtures/directorOptions.json';
import handlers, { cardUuid } from './mocks/handlers';

const queryClient = new QueryClient();
const server = setupServer(...handlers);

describe('ActivateCard component', () => {
	beforeAll(() => server.listen());
	afterEach(() => {
		server.resetHandlers();
		jest.resetAllMocks();
	});
	afterAll(() => server.close());

	const renderComponent = (props?: any) => {
		const onCloseMock = jest.fn();
		return {
			onCloseMock,
			...render(
				<QueryClientProvider client={queryClient}>
					<AuthContext.Provider value={authContextValue}>
						<ActivateCard {...props} />
					</AuthContext.Provider>
				</QueryClientProvider>
			),
		};
	};

	test('should render user type selection component when no sub page route value is provided', () => {
		renderComponent({ cardUuid, onCloseFlow: jest.fn() });
		expect(screen.getByTestId('modal-component')).toBeInTheDocument();
		expect(screen.getByText('manage_cards.activate_card.director_selection.page_title')).toBeInTheDocument();
	});

	test('should render acknowledgement component when click on continue from director selection modal', async () => {
		renderComponent({ cardUuid, onCloseFlow: jest.fn() });
		await waitFor(() => {
			expect(screen.getByText(directorOptions[0].name)).toBeInTheDocument();
		});
		fireEvent.click(screen.getByText('manage_cards.activate_card.director_selection.continue_button'));
		expect(screen.getByText('manage_cards.activate_card.acknowledgement.page_title')).toBeInTheDocument();
	});

	test('should call the on close mock when clicked on cancel button', async () => {
		const onCloseMock = jest.fn();
		renderComponent({ cardUuid, onCloseFlow: onCloseMock });
		fireEvent.click(screen.getByText('manage_cards.activate_card.director_selection.cancel_button'));
		expect(onCloseMock).toHaveBeenCalled();
	});
});
