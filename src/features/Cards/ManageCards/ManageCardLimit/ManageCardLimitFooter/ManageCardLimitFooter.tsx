import React, { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Button, { ButtonColors, ButtonTypes } from '../../../../../components/Button';
import { FooterProps } from '../../interface';
import styles from './ManageCardLimitFooter.module.scss';

const ManageCardLimitFooter: FC<FooterProps> = memo(
	({ onSecondaryButtonClick: onClose, onPrimaryButtonClick, primaryButtonType }) => {
		const { t } = useTranslation();

		const onUpdateLimitHandler = useCallback(
			(e: any) => {
				if (onPrimaryButtonClick) onPrimaryButtonClick(e);
			},
			[onPrimaryButtonClick]
		);

		const onCloseHandler = useCallback(() => {
			if (onClose) onClose();
		}, [onClose]);

		return (
			<div className={styles.footer}>
				<div>
					<Button color={ButtonColors.primary} block onClick={onUpdateLimitHandler}>
						{t('manage_cards.manage_limit.update_limit_button')}
					</Button>
				</div>
				<div>
					<Button color={ButtonColors.secondary} block onClick={onCloseHandler} type={primaryButtonType}>
						{t('manage_cards.manage_limit.cancel_button')}
					</Button>
				</div>
			</div>
		);
	}
);

ManageCardLimitFooter.defaultProps = {
	primaryButtonType: ButtonTypes.button,
};

export default ManageCardLimitFooter;
