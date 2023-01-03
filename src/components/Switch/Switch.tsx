import React from 'react';
import styles from './Switch.module.scss';
import { SwitchProps } from './interface';

const Switch = ({ on, onSwitch, noLabel }: SwitchProps) => {
	return (
		<div
			className={styles.container}
			onClick={(e) => {
				e.stopPropagation();
				onSwitch();
			}}
		>
			<button className={`${styles.btn} ${on ? styles.onBtn : ''}`} type="button">
				<span className={`${styles.circle} ${on ? styles.on : ''}`} />
			</button>
			{noLabel ? '' : <span className={`${on ? styles.onTxt : styles.offTxt}`}>{on ? 'Active' : 'Inactive'}</span>}
		</div>
	);
};

export default Switch;
