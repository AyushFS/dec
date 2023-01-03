import React, { memo, useState, useCallback, useEffect } from 'react';
import { ReactFCC } from '../../common/interface/react';
import styles from './Popup.module.scss';
import PopupContent from './PopupContent/PopupContent';

interface PopupProps {
	showPopup: boolean;
	onChangePopupState?: (popupState: boolean) => void;
	popupTitle?: React.ReactNode;
}

const Popup: ReactFCC<PopupProps> = memo(
	({ popupTitle, children: popupContent, showPopup: showPopupProp, onChangePopupState }) => {
		const [showPopup, setShowPopup] = useState(showPopupProp);

		const onClick = useCallback(() => {
			setShowPopup((prev) => !prev);
			if (onChangePopupState) onChangePopupState(!showPopup);
		}, [onChangePopupState, showPopup]);

		useEffect(() => {
			setShowPopup(showPopupProp);
		}, [showPopupProp]);

		return (
			<div className={styles.popupContainer} data-testid="popup-component">
				{popupTitle && <div onClick={onClick}>{popupTitle}</div>}
				{showPopup && popupContent && <PopupContent>{popupContent}</PopupContent>}
			</div>
		);
	}
);

Popup.defaultProps = {
	showPopup: false,
};

export default Popup;
