import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ReactFCC } from '../../../../common/interface/react';
import Button, { ButtonColors, ButtonSizes } from '../../../../components/Button';
import styles from './ActivateCardBox.module.scss';

interface ActivateCardBoxProps {
	onClick: () => void;
}

const ActivateCardBox: ReactFCC<ActivateCardBoxProps> = (props) => {
	const { t } = useTranslation();
	const { onClick } = props;
	const link1 = <a href="#"> </a>;
	const link2 = <a href="#"> </a>;
	return (
		<div className={styles.ActivateCardBox} data-testid="activate-card-box-component">
			<div className={styles.ActivateCardBoxText}>
				<Trans
					i18nKey="manage_cards.card_details.activate_card_box.text"
					components={{
						link1,
						link2,
					}}
				/>
			</div>
			<div>
				<Button color={ButtonColors.primary} size={ButtonSizes.small} block onClick={onClick}>
					{t('manage_cards.card_details.activate_card_box.button')}
				</Button>
			</div>
		</div>
	);
};

export default ActivateCardBox;
