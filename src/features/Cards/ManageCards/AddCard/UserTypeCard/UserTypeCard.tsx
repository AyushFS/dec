import React, { memo, FC } from 'react';
import { UserTypeCardProps } from './interface';
import styles from './UserTypeCard.module.scss';

const UserTypeCard: FC<UserTypeCardProps> = memo(({ icon, title, description, checked, value, onSelected }) => {
	const onChange = () => {
		if (onSelected) onSelected(value);
	};

	return (
		<div className={styles.container} onClick={onChange}>
			<input
				data-testid={`radio-${value}`}
				type="radio"
				name="user-type"
				value={value}
				onChange={onChange}
				checked={checked}
			/>
			<div className={styles.title}>
				{icon}
				<span>{title}</span>
			</div>
			<span className={styles.description}>{description}</span>
		</div>
	);
});

UserTypeCard.defaultProps = {
	icon: null,
	checked: false,
};

export default UserTypeCard;
