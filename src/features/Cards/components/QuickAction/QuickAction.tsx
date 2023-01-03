import React from 'react';
import { ReactFCC } from '../../../../common/interface/react';
import FsIcon from '../../../../components/FsIcon';
import { IconTypes } from '../../../../components/FsIcon/constants';
import styles from './QuickAction.module.scss';

interface QuickActionProps {
	icon: React.ReactNode;
	iconType?: IconTypes;
	title: string;
	onClick?: () => void;
	processing?: boolean;
}

const QuickAction: ReactFCC<QuickActionProps> = (props) => {
	const { icon, iconType, title, onClick, processing } = props;
	const iconAttrs = { size: 24, ...(iconType && { type: iconType }) };
	const attrs = {
		className: [styles.quickAction, processing ? styles.quickActionProcessing : ''].filter((s) => s).join(' '),
		'data-testid': 'quick-action-component',
		onClick,
	};
	return (
		<div {...attrs}>
			<div className={styles.quickActionIcon}>
				<FsIcon {...iconAttrs}>{icon}</FsIcon>
			</div>
			<div className={styles.quickActionTitle}>{title}</div>
		</div>
	);
};

export default QuickAction;
