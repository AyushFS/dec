import React from 'react';
import { ReactFCC } from '../../../../common/interface/react';
import Button from '../../../../components/Button';
import FsIcon from '../../../../components/FsIcon';
import styles from './SidebarHeader.module.scss';

interface SidebarHeaderProps {
	onClose?: () => void;
	label: string;
}

const SidebarHeader: ReactFCC<SidebarHeaderProps> = (props) => {
	const { onClose, label } = props;
	return (
		<div className={styles['sidebar-header-component']} data-testid="sidebar-header-component">
			<Button flat link onClick={onClose}>
				<FsIcon size={24}>cross</FsIcon>
			</Button>
			<h6 className={styles['sidebar-header-component-title']}>{label}</h6>
		</div>
	);
};

export default SidebarHeader;
