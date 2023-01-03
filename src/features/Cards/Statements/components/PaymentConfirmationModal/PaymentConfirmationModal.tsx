import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactFCC } from '../../../../../common/interface/react';
import Button, { ButtonColors, ButtonSizes } from '../../../../../components/Button';
import Image from '../../../../../components/Image';
import Modal from '../../../../../components/Modal';
import paymentProcessingImage from '../../assets/payment-processing.svg';
import styles from './PaymentConfirmationModal.module.scss';

interface PaymentConfirmationModalProps {
	onClose?: () => void;
	onButtonClick?: () => void;
}

const PaymentConfirmationModal: ReactFCC<PaymentConfirmationModalProps> = (props) => {
	const { onClose, onButtonClick, children } = props;
	const { t } = useTranslation();
	const [showModal, setShowModal] = React.useState(true);
	const onCloseModal = () => {
		setShowModal(false);
		if (onClose) onClose();
	};
	const onButtonClickHandler = () => {
		if (onButtonClick) onButtonClick();
	};

	const footer = (
		<div className={styles.footer}>
			<Button
				color={ButtonColors.primary}
				onClick={onButtonClickHandler}
				size={ButtonSizes.small}
				testId="confirmation-button"
			>
				{t('statements.payment_confirmation_modal.button')}
			</Button>
		</div>
	);

	return (
		<div className={styles.PaymentConfirmationModal} data-testid="payment-confirmation-modal-component">
			<div onClick={() => setShowModal(!showModal)}>{children}</div>
			<Modal openState={showModal} isClosable onCloseModal={onCloseModal} footer={footer} cssClass={styles.modal}>
				<Image className={styles.image} src={paymentProcessingImage} />
				<div className={styles.title}>{t('statements.payment_confirmation_modal.title')}</div>
				<div className={styles.description}>{t('statements.payment_confirmation_modal.description')}</div>
			</Modal>
		</div>
	);
};

export default PaymentConfirmationModal;
