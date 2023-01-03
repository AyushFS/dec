import React from 'react';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { RouteConfig } from '../../../../routes';
import mockRoutesConfig from '../mocks/mockRoutesConfig';
import RequireAuth from '../RequireAuth';

let mockAuthData: any = {
	auth: null,
	loading: false,
};

jest.mock('../../useAuth', () => ({
	default: () => mockAuthData,
	__esModule: true,
}));

const renderComponent = (path?: string) => {
	return render(
		<MemoryRouter initialEntries={[path || '']}>
			<Routes>
				{Object.values(mockRoutesConfig).map((route: RouteConfig) => {
					if (route.requireAuth) {
						return (
							<Route element={<RequireAuth />} key={route.path}>
								<Route path={route.path} element={route.element} />
							</Route>
						);
					}
					return <Route path={route.path} element={route.element} key={route.path} />;
				})}
			</Routes>
		</MemoryRouter>
	);
};

describe('RequireAuth component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('should render RequireAuth component with home page', () => {
		renderComponent();
		expect(screen.getByTestId(mockRoutesConfig.home.testId)).toBeInTheDocument();
	});

	test('should show loading text when loading is true', () => {
		mockAuthData = {
			auth: null,
			loading: true,
		};
		renderComponent(mockRoutesConfig.restrictedComponent.path);
		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	test('should render restricted page when auth is set and loading is false', () => {
		mockAuthData = {
			auth: { user: { name: 'test' } },
			loading: false,
		};
		renderComponent(mockRoutesConfig.restrictedComponent.path);
		expect(screen.getByTestId(mockRoutesConfig.restrictedComponent.testId)).toBeInTheDocument();
	});

	test('should redirect to login page when auth is not set', async () => {
		mockAuthData = {
			auth: null,
			loading: false,
		};
		renderComponent(mockRoutesConfig.restrictedComponent.path);
		expect(screen.getByTestId(mockRoutesConfig.login.testId)).toBeInTheDocument();
	});
});
