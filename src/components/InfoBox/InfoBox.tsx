import React from 'react';
import { ReactFCC } from '../../common/interface/react';
import FsIcon from '../FsIcon';
import { IconTypes } from '../FsIcon/constants';
import { infoIcon } from './constants';
import styles from './InfoBox.module.scss';

export interface InfoBoxProps {
	title?: string | React.ReactNode;
	icon?: React.ReactNode;
	hasIcon?: boolean;
	borderless?: boolean;
	type?: 'primary' | 'primary-light' | 'warning' | 'warning-light' | 'error' | 'success';
	size?: 'small' | null;
	iconSize?: number;
}

const InfoBox: ReactFCC<InfoBoxProps> = (props) => {
	const { title, icon, type, hasIcon, borderless, size, iconSize, children } = props;
	const attrs = {
		className: [
			styles.InfoBox,
			styles[`InfoBox--${type}`],
			size && styles[`InfoBox--size_${size}`],
			borderless && (styles['InfoBox--borderless'] as string),
		]
			.filter((s) => s)
			.join(' '),
		'data-testid': 'info-box-component',
	};
	return (
		<div {...attrs}>
			{hasIcon && (
				<div className={styles.InfoBoxIcon}>
					<FsIcon type={IconTypes.svg} size={iconSize}>
						{icon}
					</FsIcon>
				</div>
			)}
			<div>
				{title && <div className={styles.InfoBoxTitle}>{title}</div>}
				{children && <div className={styles.InfoBoxContent}>{children}</div>}
			</div>
		</div>
	);
};

InfoBox.defaultProps = {
	icon: infoIcon,
	hasIcon: true,
	type: 'primary',
	borderless: true,
	size: null,
	iconSize: 20,
};

export default InfoBox;
