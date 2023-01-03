import React, { memo, FC } from 'react';
import { getUserRole } from '../../../../../utils';
import { ExistingUserOptionProps } from '../interface';
import styles from './ExistingUserOption.module.scss';

const ExistingUserOption: FC<ExistingUserOptionProps> = memo((props) => {
	return (
		<div className={`${styles.optionContainer} ${props.selected ? styles.selected : ''}`} onClick={props.onClick}>
			<div>
				<div className={styles.title}>
					<span>{props.title}</span>
				</div>
				<div className={styles.description}>
					<span>{props.description}</span>
				</div>
			</div>
			<div className={styles.cardCount}>
				<div className={styles.cardCount}>
					<span>{`${props.cardsNum} card${props.cardsNum > 1 ? 's' : ''}`} </span>
				</div>
				<div className={styles.userType}>
					<span>{getUserRole(props.userType)}</span>
				</div>
			</div>
		</div>
	);
});

ExistingUserOption.defaultProps = {};

export default ExistingUserOption;
