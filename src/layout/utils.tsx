import React from 'react';
import { Link } from 'react-router-dom';
import FsIcon from '../components/FsIcon';
import { IconTypes } from '../components/FsIcon/constants';
import { RouteConfig } from '../routes';

export interface MenuItem {
	id: string;
	label: React.ReactNode;
	prepend: React.ReactNode;
	items: MenuItem[];
	selected: boolean;
}

export enum MenuFilterOnlyOptions {
	'isInSideMenu' = 'isInSideMenu',
	'isInSideMenuFooter' = 'isInSideMenuFooter',
	'isOnTopMenu' = 'isOnTopMenu',
}

export const createSideMenuItem = (
	routes: { [key: string]: RouteConfig },
	parentPath: string,
	filterOnly: MenuFilterOnlyOptions,
	setSelected: (path: string) => boolean
) => {
	const validRoutes = Object.values(routes).filter((route: RouteConfig) => {
		return filterOnly && route[filterOnly] === true;
	});
	const parentPathWithTrailingSlash = parentPath.endsWith('/') ? parentPath : `${parentPath}/`;

	return validRoutes.map((route: RouteConfig): MenuItem => {
		const routePathWithoutSlack = route.path.startsWith('/') ? route.path.replace('/', '') : route.path;
		const children: any = route.children || {};
		const childrenMenus = createSideMenuItem(
			children,
			`${parentPathWithTrailingSlash}${routePathWithoutSlack}`,
			filterOnly,
			setSelected
		);
		return {
			id: Math.random().toString(36).substr(2, 9),
			label: <Link to={`${parentPathWithTrailingSlash}${routePathWithoutSlack}`}>{route.title}</Link>,
			prepend: (
				<FsIcon type={IconTypes.svg} size={20}>
					{route.icon}
				</FsIcon>
			),
			items: childrenMenus,
			selected: setSelected(`${parentPathWithTrailingSlash}${routePathWithoutSlack}`),
		};
	});
};

export default createSideMenuItem;
