import React from 'react';
import { Outlet } from 'react-router-dom';
import { ReactFCC } from '../common/interface/react';
import useGlobalState from '../features/GlobalState/useGlobalState';
import AppContent from './AppContent/AppContent';
import Sidebar from './Sidebar/Sidebar';
import styles from './Layout.module.scss';
// import useAuth from '../features/Auth/useAuth';

interface LayoutProps {}

const Layout: ReactFCC<LayoutProps> = () => {
	const { toggleDrawer, isDrawerOpen } = useGlobalState();
	// const { auth } = useAuth();
	const attrs = {
		isDrawerOpen: true && isDrawerOpen('main'),
		isRuleDrawerOpen: true && isDrawerOpen('rule'),
		hideDrawer: toggleDrawer,
		navBarHeight: 64,
		visibleNavBar: false || false,
		fixedDrawer: false || false,
		hasOverlay: false,
		sidebarWidth: 200,
	};

	return (
		<main className={styles.App}>
			{true && <Sidebar drawerAttrs={attrs} />}
			<AppContent {...attrs}>
				<Outlet />
			</AppContent>
		</main>
	);
};

export default Layout;
