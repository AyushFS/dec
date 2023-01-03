import React from 'react';
import { ReactFCC } from '../../common/interface/react';
import './Button.scss';
import { BUTTON_COLORS, BUTTON_SIZES, BUTTON_TYPES, ButtonColors, ButtonSizes, ButtonTypes } from './constants';

interface ButtonProps {
	type?: ButtonTypes;
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
	block?: boolean;
	link?: boolean;
	flat?: boolean;
	filter?: boolean;
	hovered?: boolean;
	active?: boolean;
	size?: ButtonSizes;
	color?: ButtonColors;
	disabled?: boolean;
	tabindex?: number;
	testId?: string;
}

const isValidSize = (size?: ButtonSizes): string => {
	if (!size || !BUTTON_SIZES.includes(size.toLowerCase())) return '';
	return size.toLowerCase();
};

const isValidColor = (color?: string): string => {
	if (!color || !BUTTON_COLORS.includes(color.toLowerCase())) return '';
	return color.toLowerCase();
};

const getButtonType = (type?: ButtonTypes): ButtonTypes => {
	return type && BUTTON_TYPES.includes(type) ? type : ButtonTypes.button;
};

const Button: ReactFCC<ButtonProps> = (props) => {
	const classNames = [
		'button pantry-button btn',
		props.block ? 'btn--block' : '',
		props.link ? 'btn--link' : '',
		props.flat ? 'btn--flat' : '',
		props.filter ? 'btn--filter' : '',
		props.hovered ? 'is-hovered' : '',
		props.active ? 'is-active' : '',
		isValidSize(props.size) ? `btn--${props.size}` : '',
		isValidColor(props.color) ? `btn--${props.color}` : '',
	]
		.filter((val) => val)
		.join(' ')
		.trim();
	const attributes = {
		type: getButtonType(props.type),
		className: classNames,
		onClick: props.onClick,
		disabled: props.disabled === true,
		tabIndex: props.disabled ? -1 : props.tabindex || 0,
		'data-testid': props.testId,
	};

	return (
		/* eslint-disable react/button-has-type */
		<button {...attributes}>{props.children}</button>
	);
};

export default Button;
