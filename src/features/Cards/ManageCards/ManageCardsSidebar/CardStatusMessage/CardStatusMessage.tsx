import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Button, { ButtonColors, ButtonSizes } from '../../../../../components/Button';
import InfoBox from '../../../../../components/InfoBox';
import cardStatusMessageConfig from './config';
import { AllowedInfoCardStatus, CardStatusMessageConfig } from './types';
import styles from './CardStatusMessage.module.scss';

interface CardStatusMessageProps {
	cardStatus: AllowedInfoCardStatus;
}

const defaultConfig: CardStatusMessageConfig = {
	title: '',
	body: '',
	button: {
		text: '',
	},
};

const CardStatusMessage: FC<CardStatusMessageProps> = ({ cardStatus }) => {
	const { t } = useTranslation();
	const statusConfig: CardStatusMessageConfig = useMemo(
		() => cardStatusMessageConfig[cardStatus] || defaultConfig,
		[cardStatus]
	);

	return (
		<div className={styles.container} data-testid={`card-status-${cardStatus}`}>
			<InfoBox title={t(statusConfig.title)}>
				<span>{t(statusConfig.body)}</span>
				{statusConfig.button && (
					<Button color={ButtonColors.primary} size={ButtonSizes.small} link>
						{t(statusConfig.button.text)}
					</Button>
				)}
			</InfoBox>
		</div>
	);
};

CardStatusMessage.defaultProps = {};

export default CardStatusMessage;
