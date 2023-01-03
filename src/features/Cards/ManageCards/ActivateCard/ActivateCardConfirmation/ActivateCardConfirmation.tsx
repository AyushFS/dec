import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as ActivateCardConfirmationImage } from '../../../../../assets/images/activate-card/activate-card-confirmation.svg';
import styles from './ActivateCardConfirmation.module.scss';
import FsIcon from '../../../../../components/FsIcon';
import { IconTypes } from '../../../../../components/FsIcon/constants';
import Button, { ButtonColors, ButtonSizes, ButtonTypes } from '../../../../../components/Button';
import DirectorOption from '../DirectorOption';
import { DirectorOptionType } from '../interface';

interface ActivateCardConfirmationProps {
	onContinue: () => void;
	selectedDirector: DirectorOptionType | undefined;
}

const ActivateCardConfirmation: FC<ActivateCardConfirmationProps> = memo(({ onContinue, selectedDirector }) => {
	const { t } = useTranslation();

	return (
		<>
			<div className={styles.modalContent}>
				<FsIcon type={IconTypes.svg} size={115}>
					<ActivateCardConfirmationImage />
				</FsIcon>
				<span className={styles.message}>{t('manage_cards.activate_card.acknowledgement.page_description')}</span>
			</div>
			<DirectorOption {...selectedDirector} />
			<div className={styles.actionMenu}>
				<Button type={ButtonTypes.button} size={ButtonSizes.small} color={ButtonColors.primary} onClick={onContinue}>
					{t('manage_cards.activate_card.acknowledgement.continue_button')}
				</Button>
			</div>
		</>
	);
});

ActivateCardConfirmation.defaultProps = {};

export default ActivateCardConfirmation;
