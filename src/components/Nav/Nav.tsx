import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactFCC } from '../../common/interface/react';
import Routes, { RouteConfig } from '../../routes';
import useAuth from '../../features/Auth/useAuth';
import styles from './Nav.module.scss';
import Button from '../Button';
import svgIcons from '../FsIcon/FsIconSvg';
import Tooltip from '../Tooltip/Tooltip';

interface NavProps {}

const Nav: ReactFCC<NavProps> = () => {
	const { pathname } = useLocation();
	const { auth } = useAuth();
	console.log('Object.values(Routes)', Object.values(Routes));
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
				<li className={styles.NavMenuItem}>
					<div className={styles.NavMenuIcon} data-tip data-for="logout">
						<Button>{svgIcons.Logout}</Button>
					</div>

					<Tooltip id="logout" effect="solid" place="bottom">
						Logout
					</Tooltip>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
