import React from 'react';
import { Route } from 'react-router-dom';
import RouteWrapper from '../../components/RouteWrapper';
import RequireAuth from '../../features/Auth/RequireAuth';
import { RouteConfig } from '../../routes/interface';

const createRoutes = (parentPath: string, routes: { [key: string]: RouteConfig }, createChildRoutes?: boolean) => {
	return Object.values(routes).map((route: RouteConfig) => {
		const parentPathWithTrailingSlash = parentPath.endsWith('/') ? parentPath : `${parentPath}/`;
		const routePathWithoutSlack = route.path.startsWith('/') ? route.path.replace('/', '') : route.path;
		// this is to load the last route in the path
		const path = `${parentPathWithTrailingSlash}${routePathWithoutSlack}/*`.replace('//', '/');
		const childRoutes =
			createChildRoutes &&
			route.children &&
			createRoutes(`${parentPathWithTrailingSlash}${routePathWithoutSlack}`, route.children, createChildRoutes);
		const elementComponent = <RouteWrapper route={route}>{route.element}</RouteWrapper>;
		if (route.requireAuth) {
			return (
				<Route element={<RequireAuth />} key={routePathWithoutSlack}>
					<Route path={path} element={elementComponent} />
					{childRoutes}
				</Route>
			);
		}
		return (
			<Route path={path} element={elementComponent} key={routePathWithoutSlack}>
				{childRoutes}
			</Route>
		);
	});
};

export default createRoutes;
