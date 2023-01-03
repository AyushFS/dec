import React, { FC, memo } from 'react';
import FsIcon from '../../../../../../components/FsIcon';
import { IconTypes } from '../../../../../../components/FsIcon/constants';
import Modal from '../../../../../../components/Modal';
import { ReactComponent as AddCardConfirmationImage } from '../../../../../../assets/images/add-card/card_added_confirmation.svg';
import styles from './AddCardConfirmation.module.scss';
import Button, { ButtonColors, ButtonSizes, ButtonTypes } from '../../../../../../components/Button';

const AddCardConfirmation: FC<{ onClose: () => void }> = memo(({ onClose }) => {
	return (
		<Modal
			openState
			isClosable
			onCloseModal={onClose}
			title="Card added successfully"
			footer={
				<div className={styles.actionMenu}>
					<Button type={ButtonTypes.button} size={ButtonSizes.small} color={ButtonColors.primary} onClick={onClose}>
						Continue
					</Button>
				</div>
			}
		>
			<div className={styles.modalContent}>
				<FsIcon type={IconTypes.svg} size={300}>
					<AddCardConfirmationImage />
				</FsIcon>
			</div>
		</Modal>
	);
});

export default AddCardConfirmation;
