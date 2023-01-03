import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import Modal from '../../../../components/Modal';
import UnderstandCardSpending from './UnderstandCardSpending';
import SpecifyLimit from '../AddCard/steps/SpecifyLimit';
import stepwiseConfiguration from './config';
import MANAGE_CARD_LIMIT_STEPS from './constants';
import styles from './ManageCardLimit.module.scss';
import ManageCardLimitFooter from './ManageCardLimitFooter';

interface ManageCardLimitProps {
	onCloseFlow: () => void;
	maxCardLimit: string;
	currentLimit: string;
	userUuid: string;
	cardUuid: string;
	cardSpendPurposeUuid: string;
}

const ManageCardLimit: FC<ManageCardLimitProps> = memo(({ onCloseFlow, ...specifyLimitProps }) => {
	const [step, setStep] = useState<MANAGE_CARD_LIMIT_STEPS>(MANAGE_CARD_LIMIT_STEPS.CONSENT);
	const stepsConfiguration = useMemo(() => stepwiseConfiguration(), []);
	const currentStepConfiguration = stepsConfiguration[step];

	const onConsentUpdateLimit = useCallback(() => {
		setStep(MANAGE_CARD_LIMIT_STEPS.UPDATE_LIMIT);
	}, []);

	const onClose = useCallback(() => {
		setStep(MANAGE_CARD_LIMIT_STEPS.CONSENT);
		if (onCloseFlow) onCloseFlow();
	}, [onCloseFlow]);

	return (
		<Modal cssClass={styles.wrapper} openState onCloseModal={onClose} isClosable title={currentStepConfiguration.title}>
			{
				{
					[MANAGE_CARD_LIMIT_STEPS.CONSENT]: (
						<UnderstandCardSpending
							onConsentUpdateLimit={onConsentUpdateLimit}
							onClose={onClose}
							footerComponent={ManageCardLimitFooter}
						/>
					),
					[MANAGE_CARD_LIMIT_STEPS.UPDATE_LIMIT]: (
						<SpecifyLimit
							isEditMode
							onCancel={onClose}
							footerComponent={ManageCardLimitFooter}
							{...specifyLimitProps}
						/>
					),
				}[step]
			}
		</Modal>
	);
});

ManageCardLimit.defaultProps = {};

export default ManageCardLimit;
