import React from 'react';
import { ReactFCC } from '../../common/interface/react';
import './Card.scss';

interface CardProps {
	icon?: string;
	iconSize?: 'default' | 'small';
	borderRadius?: number;
	cardPadding?: number;
	contentPadding?: number;
	backgroundColor?: string;
}

const isValidInteger = (num?: number) => {
	return num !== null && !Number.isNaN(Number(num));
};

const Card: ReactFCC<CardProps> = (props) => {
	const { cardPadding, contentPadding, icon, iconSize, borderRadius, backgroundColor } = props;
	const cardClassNames = [`card p-${isValidInteger(cardPadding) ? cardPadding : 6}`]
		.filter((val) => val)
		.join(' ')
		.trim();
	const iconClass = ['card__icon mh-3', iconSize || 'default']
		.filter((val) => val)
		.join(' ')
		.trim();
	const contentClass = [`card__content p-${isValidInteger(contentPadding) ? contentPadding : 6}`]
		.filter((val) => val)
		.join(' ')
		.trim();
	const styles = {
		...(borderRadius && {
			borderRadius: `${borderRadius}px`,
		}),
		...(backgroundColor && {
			backgroundColor,
		}),
	};
	const attributes = {
		className: cardClassNames,
		style: styles,
	};
	return (
		<div {...attributes} data-testid="card">
			<div className="card-body">
				{icon && (
					<div data-testid="card-icon" className={iconClass}>
						<img src={icon} alt={icon} />
					</div>
				)}
				<div data-testid="card-content" className={contentClass}>
					{props.children}
				</div>
			</div>
		</div>
	);
};

export default Card;
