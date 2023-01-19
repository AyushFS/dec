import React from 'react';
import { ReactFCC } from '../../common/interface/react';
import useGlobalState from '../../features/GlobalState/useGlobalState';
import Button from '../Button';
import FsIcon from '../FsIcon';
import Nav from '../Nav';
import styles from './Header.module.scss';

interface HeaderProps {}

const Header: ReactFCC<HeaderProps> = () => {
	const { toggleDrawer, pageData } = useGlobalState();

	return (
		<header className={styles.Header} data-testid="header-component">
			<div className={styles.HeaderBar} role="navigation">
				<div className={styles.HeaderNavTrigger}>
					<Button link onClick={() => toggleDrawer('main')}>
						<FsIcon>hamburger</FsIcon>
					</Button>
				</div>
				<div className={styles.HeaderPageTitle}>{pageData?.title || ''}</div>
				<Nav />
			</div>
		</header>
	);
};

export default Header;
