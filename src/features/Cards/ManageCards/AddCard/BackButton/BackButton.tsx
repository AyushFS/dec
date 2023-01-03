import React, { memo, FC } from 'react';
import styles from './BackButton.module.scss';
import { ReactComponent as ArrowLeft } from '../../../../../assets/images/icons/arrow-left.svg';
import Button, { ButtonColors, ButtonSizes, ButtonTypes } from '../../../../../components/Button';
import FsIcon from '../../../../../components/FsIcon';
import { IconTypes } from '../../../../../components/FsIcon/constants';
import i18n from '../../../../../common/utilities/i18n';

interface BackButtonProps {
	label?: string | (() => string);
	onBack?: () => void;
}

const BackButton: FC<BackButtonProps> = memo(({ label, onBack }) => {
	const backLabel = typeof label === 'function' ? label() : label;
	return (
		<Button type={ButtonTypes.button} size={ButtonSizes.default} link color={ButtonColors.primary} onClick={onBack}>
			<div className={styles.backButton}>
				<FsIcon size={24} type={IconTypes.svg}>
					<ArrowLeft />
				</FsIcon>
				<span>{backLabel}</span>
			</div>
		</Button>
	);
});

BackButton.defaultProps = {
	label: () => i18n.t('manage_cards.add_card.shared.back_button_label'),
};

export default BackButton;
