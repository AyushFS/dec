import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactFCC } from '../../common/interface/react';
import List from '../../components/List';
import Routes from '../../routes';
import Drawer from '../../components/Drawer';
import { createSideMenuItem, MenuFilterOnlyOptions } from '../utils';
import Logo from '../../assets/images/logo.png';
import FsIcon from '../../components/FsIcon';
import Button from '../../components/Button';
import useGlobalState from '../../features/GlobalState/useGlobalState';
import styles from './Sidebar.module.scss';

const sideMenuFromRoutes: any = (setSelected: (path: string) => boolean) =>
	createSideMenuItem(Routes, '/', MenuFilterOnlyOptions.isInSideMenu, setSelected);
const sideMenuFooterFromRoutes: any = (setSelected: (path: string) => boolean) =>
	createSideMenuItem(Routes, '/', MenuFilterOnlyOptions.isInSideMenuFooter, setSelected);

interface SidebarProps {
	drawerAttrs: {
		isDrawerOpen: boolean;
		hideDrawer: () => void;
		navBarHeight: number;
		visibleNavBar: boolean;
		fixedDrawer: boolean;
		hasOverlay: boolean;
	};
}

const Sidebar: ReactFCC<SidebarProps> = (props) => {
	const { pathname } = useLocation();
	const { toggleDrawer, isMobile } = useGlobalState();
	const { drawerAttrs } = props;
	const setSelected = (path: string) => {
		const pathWithoutInitialSlash = path.replace('/', '');
		const urlParts = pathname.split('/').filter((part) => part !== '');
		urlParts.pop();
		const isParentOfSelected = pathWithoutInitialSlash && pathWithoutInitialSlash === urlParts.join('/');
		const isExactPath = path === pathname;
		return isParentOfSelected || isExactPath;
	};
	const onSelectCallback = () => {
		if (isMobile) {
			toggleDrawer('main');
		}
	};

	return (
		<Drawer
			{...drawerAttrs}
			header={
				<>
					<div className={styles.SidebarHeader}>
						<Link to="/">
							<img alt="logo" src={Logo} />
						</Link>
						<span className={styles.SidebarToggleDrawer}>
							<Button link onClick={() => toggleDrawer()} testId="close-button">
								<FsIcon size={24}>cross</FsIcon>
							</Button>
						</span>
					</div>
					<hr className={styles.SidebarRuler} />
				</>
			}
			content={<List items={sideMenuFromRoutes(setSelected)} onSelectCallback={onSelectCallback} />}
			footer={<List items={sideMenuFooterFromRoutes(setSelected)} onSelectCallback={onSelectCallback} />}
			// footer={<div>2021</div>}
		/>
	);
};

export default Sidebar;
