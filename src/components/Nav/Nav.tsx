import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactFCC } from '../../common/interface/react';
import Routes, { RouteConfig } from '../../routes';
import useAuth from '../../features/Auth/useAuth';
import styles from './Nav.module.scss';

interface NavProps {}

const Nav: ReactFCC<NavProps> = () => {
	const { pathname } = useLocation();
	const { auth } = useAuth();
	return (
		<nav className={styles.NavMenu} data-testid="nav-menu">
			<ul className={styles.NavMenuItems}>
				{Object.values(Routes).map((route: RouteConfig) => {
					const className = pathname === route.path ? styles.NavMenuActive : '';
					if (!route.isOnTopMenu) return null;
					if (route.requireAuth && !auth) return null;
					if (!route.requireAuth && auth) return null;
					return (
						<li className={styles.NavMenuItem} key={route.path}>
							<Link to={route.path.replace('*', '')} className={className}>
								<div className={styles.NavMenuIcon}>{route.title}</div>
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Nav;
