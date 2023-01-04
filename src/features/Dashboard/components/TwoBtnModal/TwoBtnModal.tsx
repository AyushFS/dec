import React from 'react';
import Button, { ButtonColors } from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import styles from './TwoBtnModal.module.scss';

interface TwoBtnModalProps {
	openModal: boolean;
	firstBtnText?: string;
	secondBtnText?: string;
	handleModalToggle: () => void;
	handleFirstBtn: () => void;
	handleSecondBtn: () => void;
	title?: string;
	msg?: string;
}

const TwoBtnModal = ({
	openModal,
	firstBtnText,
	secondBtnText,
	handleModalToggle,
	handleFirstBtn,
	handleSecondBtn,
	title,
	msg,
}: TwoBtnModalProps) => {
	return (
		<Modal
			openState={openModal}
			isClosable
			onCloseModal={handleModalToggle}
			title={title || 'Are you sure you want to delete?'}
		>
			<p className={styles.description}>{msg || 'You will loose all the information that you added.'}</p>
			<div className={styles.modal_btns}>
				<Button color={ButtonColors.secondary} onClick={handleFirstBtn}>
					{firstBtnText || 'No'}
				</Button>
				<Button color={ButtonColors.primary} onClick={handleSecondBtn}>
					{secondBtnText || 'Yes'}
				</Button>
			</div>
		</Modal>
	);
};

export default TwoBtnModal;
