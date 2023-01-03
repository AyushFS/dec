import React from 'react';
import { ReactFCC } from '../../../../common/interface/react';
import SidebarHeader from '../SidebarHeader';
import styles from './Sidebar.module.scss';

interface SidebarProps {
	label: string;
	onClose?: () => void;
	onOverlayClick?: () => void;
}

const Sidebar: ReactFCC<SidebarProps> = (props) => {
	const { label, onClose, onOverlayClick, children } = props;
	return (
		<div className={styles.Sidebar} data-testid="sidebar-component">
			<div
				className={styles.SidebarOverlay}
				data-testid="sidebar-component--overlay"
				onClick={() => onOverlayClick?.()}
			/>
			<div className={styles.SidebarContent}>
				<SidebarHeader onClose={() => onClose?.()} label={label} />
				{children}
			</div>
		</div>
	);
};

export default Sidebar;
