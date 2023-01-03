import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactFCC } from '../../../../../common/interface/react';
import InfoBox from '../../../../../components/InfoBox';
import { FooterProps } from '../../interface';
import styles from './UnderstandCardSpending.module.scss';

export interface UnderstandCardSpendingProps {
	footerComponent: React.FC<FooterProps>;
	onConsentUpdateLimit?: () => void;
	onClose?: () => void;
}

const UnderstandCardSpending: ReactFCC<UnderstandCardSpendingProps> = ({
	onConsentUpdateLimit,
	onClose,
	footerComponent: FooterComponent,
}) => {
	const { t } = useTranslation();

	const onConsentUpdateLimitHandler = useCallback(() => {
		if (onConsentUpdateLimit) onConsentUpdateLimit();
	}, [onConsentUpdateLimit]);

	const onCloseHandler = useCallback(() => {
		if (onClose) onClose();
	}, [onClose]);

	return (
		<div className={styles.understandCardSpending} data-testid="understanding-card-spending-component">
			<p>{t('manage_cards.manage_limit.understand_card_spending_modal.subtitle')}</p>
			<ul>
				<li>
					<span>{t('manage_cards.manage_limit.understand_card_spending_modal.available_amount.title')}:</span>{' '}
					{t('manage_cards.manage_limit.understand_card_spending_modal.available_amount.description')}
				</li>
			</ul>
			<InfoBox borderless hasIcon={false}>
				{t('manage_cards.manage_limit.understand_card_spending_modal.note')}
			</InfoBox>
			<ul>
				<li>
					<span>{t('manage_cards.manage_limit.understand_card_spending_modal.spending.title')}:</span>{' '}
					{t('manage_cards.manage_limit.understand_card_spending_modal.spending.description')}
				</li>
			</ul>
			<ul>
				<li>
					<span>{t('manage_cards.manage_limit.understand_card_spending_modal.spending_limit.title')}:</span>{' '}
					{t('manage_cards.manage_limit.understand_card_spending_modal.spending_limit.description')}
				</li>
			</ul>
			<FooterComponent onPrimaryButtonClick={onConsentUpdateLimitHandler} onSecondaryButtonClick={onCloseHandler} />
		</div>
	);
};

export default UnderstandCardSpending;
