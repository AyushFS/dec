import React, { useCallback, useEffect, useRef } from 'react';
import { ReactFCC } from '../../common/interface/react';
import Button from '../Button';
import FsIcon from '../FsIcon';
import styles from './Snackbar.module.scss';
import { IconTypes } from '../FsIcon/constants';
import { SnackbarProps } from './interface';

const crossIcon = (
	<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M0 1.41L1.41 0L7 5.59L12.59 0L14 1.41L8.41 7L14 12.59L12.59 14L7 8.41L1.41 14L0 12.59L5.59 7L0 1.41Z"
			fill="#4A4A4A"
		/>
	</svg>
);

const Snackbar: ReactFCC<SnackbarProps> = (props) => {
	const timer = useRef<NodeJS.Timeout>();
	const { message, icon, onAction, onSnackbarDismiss, timeout } = props;
	const [show, setShow] = React.useState(true);
	const onActionHandler = () => {
		setShow(false);
		if (onAction) {
			onAction();
		}
	};
	const clearTimer = () => {
		if (timer.current) {
			clearTimeout(timer.current);
		}
	};
	const resetTimer = useCallback(() => {
		clearTimer();
		if (timeout !== null) {
			timer.current = setTimeout(() => {
				setShow(false);
			}, timeout);
		}
	}, [timeout]);

	useEffect(() => {
		resetTimer();
	}, [message, icon, onAction, onSnackbarDismiss, timeout, resetTimer]);

	useEffect(() => {
		if (!show) {
			clearTimer();
			if (onSnackbarDismiss) {
				onSnackbarDismiss();
			}
		}
	}, [show, onSnackbarDismiss]);

	if (!show) {
		return null;
	}

	return (
		<div className={styles.Snackbar} data-testid="snackbar-component">
			<div className={styles.SnackbarBody}>
				<div className={styles.SnackbarTitle}>{message}</div>
				<div className={styles.SnackbarCloseTrigger}>
					<Button flat link testId="snackbar-trigger" onClick={onActionHandler}>
						{icon}
					</Button>
				</div>
			</div>
		</div>
	);
};

Snackbar.defaultProps = {
	message: '',
	icon: <FsIcon type={IconTypes.svg}>{crossIcon}</FsIcon>,
	onAction: () => {},
	onSnackbarDismiss: () => {},
	timeout: 4000,
};

export default Snackbar;
