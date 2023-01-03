import React from 'react';
import { RouteConfig } from '../../../../routes';

interface MockRouterConfig extends RouteConfig {
	testId: string;
}

const mockRoutesConfig: { [key: string]: MockRouterConfig } = {
	home: {
		title: 'Home',
		path: '/',
		testId: 'home-component',
		element: <div data-testid="home-component">Home Component</div>,
		requireAuth: false,
	},
	restrictedComponent: {
		title: 'Restricte Component',
		path: '/restricted-component',
		testId: 'restricted-component',
		element: <div data-testid="restricted-component">Restricted Component</div>,
		requireAuth: true,
	},
	login: {
		title: 'Login',
		path: '/login',
		testId: 'login-component',
		element: <div data-testid="login-component">Login Component</div>,
		requireAuth: false,
	},
};

export default mockRoutesConfig;
