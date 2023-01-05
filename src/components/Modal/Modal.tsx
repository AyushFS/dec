import React, { memo, useCallback, useEffect, useState } from 'react';
import { ReactFCC } from '../../common/interface/react';
import Button, { ButtonColors, ButtonSizes, ButtonTypes } from '../Button';
import FsIcon from '../FsIcon';
import { ModalProps } from './interface';
import styles from './Modal.module.scss';

const Modal: ReactFCC<ModalProps> = memo(
	({ title, children, isClosable, cssClass, footer, onCloseModal, openState, extraWidth }) => {
		const [isOpen, setIsOpen] = useState<boolean>(openState);

		const closeModal = useCallback(() => {
			setIsOpen(false);
			if (onCloseModal) onCloseModal();
		}, [onCloseModal]);

		useEffect(() => {
			setIsOpen(openState);
		}, [openState]);

		const showHeader = title || isClosable;

		if (!isOpen) return null;

		return (
			<div className={[styles.modalContainer, cssClass].filter((s) => s).join(' ')} data-testid="modal-component">
				<div className={`${styles.modal} modal ${extraWidth ? styles.extraWidth : ''}`}>
					<div className={styles.modalContent}>
						{showHeader && (
							<div className={`${styles.modalHeader} modal-header`}>
								<h5>{title}</h5>
								{isClosable && (
									<Button
										type={ButtonTypes.button}
										size={ButtonSizes.small}
										color={ButtonColors.primary}
										onClick={closeModal}
										link
										testId="close-modal-button"
									>
										<FsIcon size={24}>cross</FsIcon>
									</Button>
								)}
							</div>
						)}
						{children && <div className={`${styles.modalBody} modal-body`}>{children}</div>}
						{footer && <div className={`${styles.actionMenu} footer`}>{footer}</div>}
					</div>
				</div>
			</div>
		);
	}
);

Modal.defaultProps = {
	openState: false,
	isClosable: false,
	title: '',
	footer: null,
	cssClass: '',
};

Modal.displayName = 'Modal';

export default Modal;
