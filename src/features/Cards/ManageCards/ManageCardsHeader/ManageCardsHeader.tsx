import React from 'react';
import { useTranslation } from 'react-i18next';
import Button, { ButtonColors, ButtonSizes, ButtonTypes } from '../../../../components/Button';
import FsIcon from '../../../../components/FsIcon';
import './ManageCardsHeader.scss';

interface ManagerCardsHeaderProps {
	onAddCardClick?: () => void;
}

function ManageCardsHeader({ onAddCardClick }: ManagerCardsHeaderProps) {
	const { t } = useTranslation();
	return (
		<div className="manage-cards-header-component" data-testid="manage-cards-header-component">
			<h6>{t('manage_cards.title')}</h6>
			<Button type={ButtonTypes.button} color={ButtonColors.primary} size={ButtonSizes.small} onClick={onAddCardClick}>
				<FsIcon>plus</FsIcon> {t('manage_cards.add_card_button')}
			</Button>
		</div>
	);
}

export default ManageCardsHeader;
