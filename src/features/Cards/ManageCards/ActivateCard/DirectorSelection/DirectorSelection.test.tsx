import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/lib/node';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthContext from '../../../../Auth/AuthProvider';
import { authContextValue } from '../../AddCard/steps/UserDetailsForm/mocks/testdata';
import handlers, { cardUuid } from '../mocks/handlers';
import DirectorSelection from './DirectorSelection';
import directorOptions from '../mocks/fixtures/directorOptions.json';

const page_description = 'manage_cards.activate_card.director_selection.page_description';
const continueButtonLabel = 'manage_cards.activate_card.director_selection.continue_button';
const cancelButtonLabel = 'manage_cards.activate_card.director_selection.cancel_button';

const queryClient = new QueryClient();
const server = setupServer(...handlers);

describe('DirectorSelection component', () => {
	beforeAll(() => server.listen());
	afterEach(() => {
		server.resetHandlers();
		jest.resetAllMocks();
	});
	afterAll(() => server.close());

	const renderComponent = (props?: any) => {
		const onCloseMock = jest.fn();
		const setSelectedDirector = jest.fn();

		return {
			onCloseMock,
			setSelectedDirector,
			...render(
				<QueryClientProvider client={queryClient}>
					<AuthContext.Provider value={authContextValue}>
						<DirectorSelection
							onCancel={onCloseMock}
							setSelectedDirector={setSelectedDirector}
							cardUuid={cardUuid}
							{...props}
						/>
					</AuthContext.Provider>
				</QueryClientProvider>
			),
		};
	};

	test('should render specify limit page properly', async () => {
		renderComponent();
		expect(screen.getByText(page_description)).toBeInTheDocument();
		expect(screen.getByText(continueButtonLabel)).toBeInTheDocument();
		expect(screen.getByText(cancelButtonLabel)).toBeInTheDocument();
		await waitFor(() => {
			expect(screen.getByText(directorOptions[0].name)).toBeInTheDocument();
		});
		expect(screen.getByText(directorOptions[0].email)).toBeInTheDocument();
	});

	test('should select the director when clicked on it', async () => {
		const { setSelectedDirector } = renderComponent();
		await waitFor(() => {
			expect(screen.getByText(directorOptions[0].name)).toBeInTheDocument();
		});
		expect(screen.getByText(directorOptions[0].email)).toBeInTheDocument();
		fireEvent.click(screen.getByText(directorOptions[1].email));
		fireEvent.click(screen.getByText(continueButtonLabel));
		expect(setSelectedDirector).toHaveBeenCalledWith(
			expect.objectContaining({ description: directorOptions[1].email, title: directorOptions[1].name })
		);
	});

	test('should call continue callback when clicked on continue button', () => {
		const onContinueMock = jest.fn();
		renderComponent({ onContinue: onContinueMock, selectedDirector: directorOptions[0] });
		fireEvent.click(screen.getByText(continueButtonLabel));
		expect(onContinueMock).toHaveBeenCalled();
	});

	test('should not call continue callback when director is not selected', () => {
		const onContinueMock = jest.fn();
		renderComponent({ onContinue: onContinueMock });
		fireEvent.click(screen.getByText(continueButtonLabel));
		expect(onContinueMock).not.toHaveBeenCalled();
	});
});
