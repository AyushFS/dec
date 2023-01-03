import React, { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Button, { ButtonColors, ButtonSizes, ButtonTypes } from '../../../../../components/Button';
import { FooterProps } from '../../interface';
import styles from './AddCardFooter.module.scss';

const AddCardFooter: FC<FooterProps> = memo(
	({ onPrimaryButtonClick, onSecondaryButtonClick: onClose, primaryButtonType }) => {
		const { t } = useTranslation();

		const onContinueHandler = useCallback(
			(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
				if (onPrimaryButtonClick) onPrimaryButtonClick(e);
			},
			[onPrimaryButtonClick]
		);

		const onCloseHandler = useCallback(
			(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
				if (onClose) onClose(e);
			},
			[onClose]
		);

		return (
			<div className={styles.actionMenu}>
				<Button
					type={ButtonTypes.button}
					size={ButtonSizes.small}
					color={ButtonColors.secondary}
					onClick={onCloseHandler}
				>
					{t('manage_cards.add_card.specify_limit_page.cancel_button')}
				</Button>
				<Button
					type={primaryButtonType}
					size={ButtonSizes.small}
					color={ButtonColors.primary}
					onClick={onContinueHandler}
				>
					{t('manage_cards.add_card.specify_limit_page.continue_button')}
				</Button>
			</div>
		);
	}
);

AddCardFooter.defaultProps = {
	primaryButtonType: ButtonTypes.button,
};

export default AddCardFooter;
