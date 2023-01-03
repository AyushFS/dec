import React, { FC, memo, useCallback, useMemo, useState } from 'react';
import Modal from '../../../../components/Modal';
import ActivateCardConfirmation from './ActivateCardConfirmation';
import stepwiseConfiguration from './config';
import CARD_ACTIVATION_STEPS from './constants';
import DirectorSelection from './DirectorSelection/DirectorSelection';
import { DirectorOptionType } from './interface';
import styles from './ActivateCard.module.scss';

interface ActivateCardProps {
	onCloseFlow: () => void;
	cardUuid: string;
}

const ActivateCard: FC<ActivateCardProps> = memo(({ onCloseFlow, cardUuid }) => {
	const [step, setStep] = useState<CARD_ACTIVATION_STEPS>(CARD_ACTIVATION_STEPS.DIRECTOR_SELECTION);
	const stepsConfiguration = useMemo(() => stepwiseConfiguration(), []);
	const currentStepConfiguration = stepsConfiguration[step];
	const [selectedDirector, setSelectedDirector] = useState<DirectorOptionType>();

	const onContinue = useCallback(() => {
		setStep(CARD_ACTIVATION_STEPS.ACKNOWLEDGEMENT);
	}, []);

	const onClose = useCallback(() => {
		setStep(CARD_ACTIVATION_STEPS.DIRECTOR_SELECTION);
		if (onCloseFlow) onCloseFlow();
	}, [onCloseFlow]);

	return (
		<Modal cssClass={styles.wrapper} openState onCloseModal={onClose} isClosable title={currentStepConfiguration.title}>
			{
				{
					[CARD_ACTIVATION_STEPS.DIRECTOR_SELECTION]: (
						<DirectorSelection
							selectedDirector={selectedDirector}
							setSelectedDirector={setSelectedDirector}
							onContinue={onContinue}
							onCancel={onClose}
							cardUuid={cardUuid}
						/>
					),
					[CARD_ACTIVATION_STEPS.ACKNOWLEDGEMENT]: (
						<ActivateCardConfirmation selectedDirector={selectedDirector} onContinue={onClose} />
					),
				}[step]
			}
		</Modal>
	);
});

ActivateCard.defaultProps = {};

export default ActivateCard;
