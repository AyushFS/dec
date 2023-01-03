import React from 'react';
import { ReactFCC } from '../../common/interface/react';
import { IconTypes } from './constants';
import './FsIcon.scss';
import './FsIcons.scss';

interface IconProps {
	type?: IconTypes;
	disabled?: boolean;
	left?: boolean;
	right?: boolean;
	size?: number | string;
	color?: string;
}

const FsIcon: ReactFCC<IconProps> = (props) => {
	const { type, disabled, left, right, size, color, children, ...restOfTheAttributes } = props;

	const iconType = type || IconTypes.icon;
	const iconSize = size || 16;

	const isFontIcon = [IconTypes.fontawesome, IconTypes.material, IconTypes.mdi].includes(iconType);

	// eslint-disable-next-line
	const getIconTypeClasses = (iconType: IconTypes) => {
		if (iconType === IconTypes.material) {
			return 'material-icons';
		}

		if (iconType === IconTypes.mdi) {
			return `mdi ${children?.toString().toLowerCase()}`;
		}

		if (iconType === IconTypes.fontawesome) {
			return `fa ${(children || '').toString().toLowerCase()}`;
		}

		if (iconType === IconTypes.icon) {
			return `fs-icon--${(children || '').toString().toLowerCase()}`;
		}
	};

	const classNames = [
		'fs-icon',
		disabled && 'fs-icon--disabled',
		left && 'fs-icon--left',
		right && 'fs-icon--right',
		getIconTypeClasses(iconType),
	]
		.filter((val) => val)
		.join(' ')
		.trim();

	const attributes = {
		'data-testid': 'fs-icon',
		className: classNames,
		style: {
			...(!isFontIcon && {
				width: `${iconSize}px`,
				height: `${iconSize}px`,
			}),
			...(isFontIcon && {
				fontSize: `${iconSize}px`,
				...(color && { color }),
			}),
		},
		...(disabled && {
			disabled,
		}),
		...restOfTheAttributes,
	};

	if (iconType === IconTypes.svg) {
		return <div {...attributes}>{children}</div>;
	}

	if (iconType === IconTypes.img) {
		return (
			<div {...attributes}>
				<img src={children as string} alt="" />
			</div>
		);
	}

	if ([IconTypes.mdi, IconTypes.fontawesome].includes(iconType)) {
		return <i {...attributes} />;
	}

	if (iconType === IconTypes.material) {
		return <i {...attributes}>{children}</i>;
	}

	return <div {...attributes} />;
};

export default FsIcon;
