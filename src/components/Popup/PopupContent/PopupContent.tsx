import React, { memo } from 'react';
import { ReactFCC } from '../../../common/interface/react';
import styles from './PopupContent.module.scss';

const PopupContent: ReactFCC<{}> = memo(({ children }) => {
	return (
		<div className={styles.popupContentContainer} data-testid="popup-content-component">
			{children}
		</div>
	);
});

PopupContent.defaultProps = {};

export default PopupContent;
