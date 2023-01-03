import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactFCC } from '../../../../../common/interface/react';
import Button, { ButtonColors } from '../../../../../components/Button';
import Modal from '../../../../../components/Modal';
import styles from './UnderstandBill.module.scss';

interface UnderstandBillProps {}

const UnderstandBill: ReactFCC<UnderstandBillProps> = (props) => {
	const { children } = props;
	const { t } = useTranslation();
	const [showModal, setShowModal] = React.useState(false);
	const onCloseModal = () => {
		setShowModal(false);
	};

	const points = [
		'due_date',
		'billing_cycle',
		'total_amount_due',
		'minimum_due',
		'utilisatin_amount',
		'rollover_interest_fee',
		'late_fee',
	];

	const footer = (
		<div className={styles.footer}>
			<div>
				<Button color={ButtonColors.primary} block onClick={onCloseModal}>
					{t('statements.understand_bill_modal.ok_button')}
				</Button>
			</div>
			<div>
				<Button color={ButtonColors.secondary} block onClick={onCloseModal}>
					{t('statements.understand_bill_modal.cancel_button')}
				</Button>
			</div>
		</div>
	);

	return (
		<div className={styles.UnderstandBill} data-testid="understanding-bill-component">
			<div onClick={() => setShowModal(!showModal)}>{children}</div>
			<Modal
				title={t('statements.understand_bill_modal.title')}
				openState={showModal}
				isClosable
				onCloseModal={onCloseModal}
				footer={footer}
				cssClass={styles.modal}
			>
				{points.map((point) => (
					<div key={point}>
						<ul>
							<li>
								<span className={styles.title}>{t(`statements.understand_bill_modal.${point}.title`)}:</span>{' '}
								{t(`statements.understand_bill_modal.${point}.description`)}
							</li>
						</ul>
					</div>
				))}
			</Modal>
		</div>
	);
};

export default UnderstandBill;
