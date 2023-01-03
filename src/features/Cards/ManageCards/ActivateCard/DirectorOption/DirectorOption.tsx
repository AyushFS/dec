import React, { memo, FC } from 'react';
import { DirectorOptionType } from '../interface';
import styles from './DirectorOption.module.scss';

interface DirectorOptionProps extends DirectorOptionType {
	onClick?: () => void;
	selected?: boolean;
	showRadio?: boolean;
}

const DirectorOption: FC<DirectorOptionProps> = memo((props) => {
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
			{props.showRadio && (
				<div className={styles.radioButton}>
					<input type="radio" name="director-option" checked={props.selected} onChange={props.onClick} />
				</div>
			)}
		</div>
	);
});

DirectorOption.defaultProps = {
	title: '',
	disabled: false,
	description: '',
	uuid: '',
	showRadio: false,
};

export default DirectorOption;
