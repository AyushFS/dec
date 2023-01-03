import React from 'react';
import { ReactFCC } from '../../../../common/interface/react';
import useGlobalState from '../../../GlobalState/useGlobalState';
import StickyHeader from '../../../../components/StickyHeader';
import styles from './PageWithSidebar.module.scss';
import Sidebar from '../Sidebar/Sidebar';

interface PageWithSidebarProps {
	header?: React.ReactNode;
	sidebarContent?: React.ReactNode;
	sidebarLabel?: string;
	onClose?: () => void;
	onOverlayClick?: () => void;
}

const PageWithSidebar: ReactFCC<PageWithSidebarProps> = (props) => {
	const { header, sidebarContent, sidebarLabel, onClose, onOverlayClick, children } = props;
	const { isMobile } = useGlobalState();
	return (
		<div className={styles.PageWithSidebar} data-testid="page-with-sidebar-component">
			<div className={styles.PageWithSidebarColumns}>
				<div className={styles.PageWithSidebarColumns__list}>
					<div className={isMobile ? 'container-fluid' : 'container'} data-testid="container">
						{header && <StickyHeader>{header}</StickyHeader>}
						<div className="row">
							<div className="col col--12/12-small">{children}</div>
						</div>
					</div>
				</div>
				{sidebarContent && (
					<Sidebar onClose={onClose} onOverlayClick={onOverlayClick} label={sidebarLabel || ''}>
						{sidebarContent}
					</Sidebar>
				)}
			</div>
		</div>
	);
};

export default PageWithSidebar;
