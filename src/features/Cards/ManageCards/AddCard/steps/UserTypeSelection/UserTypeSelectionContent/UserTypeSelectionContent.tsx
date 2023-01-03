import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Button, { ButtonColors, ButtonSizes, ButtonTypes } from '../../../../../../../components/Button';
import FsIcon from '../../../../../../../components/FsIcon';
import { USER_TYPES } from '../../../constants';
import UserTypeCard from '../../../UserTypeCard';
import styles from './UserTypeSelectionContent.module.scss';

interface PageContentProps {
	selectedUserType: USER_TYPES;
	onChangeSelectedUser: (selectedUser: USER_TYPES) => void;
	onContinue: () => void;
	isMobile?: boolean;
	onClose?: () => void;
}

const UserTypeSelectionContent: FC<PageContentProps> = ({
	selectedUserType,
	onContinue,
	onChangeSelectedUser,
	isMobile,
	onClose,
}) => {
	const { t } = useTranslation();
	return (
		<div className={styles.modalContent}>
			<div className={styles.header}>
				<span>{t('manage_cards.add_card.user_type_selection.page_title')}</span>
				{!isMobile && (
					<Button
						link
						type={ButtonTypes.button}
						size={ButtonSizes.small}
						color={ButtonColors.primary}
						onClick={onClose}
						testId="close-icon"
					>
						<FsIcon size={24}>cross</FsIcon>
					</Button>
				)}
			</div>
			<span className={styles.message}>{t('manage_cards.add_card.user_type_selection.page_description')}</span>
			<div className={styles.userTypes}>
				<UserTypeCard
					icon={<FsIcon size={24}>add-user</FsIcon>}
					title={t('manage_cards.add_card.user_type_selection.new_user')}
					value={USER_TYPES.NEW_USER}
					description={t('manage_cards.add_card.user_type_selection.new_user_description')}
					checked={selectedUserType === USER_TYPES.NEW_USER}
					onSelected={onChangeSelectedUser}
				/>
				<UserTypeCard
					icon={<FsIcon size={24}>investor-profile</FsIcon>}
					title={t('manage_cards.add_card.user_type_selection.existing_user')}
					value={USER_TYPES.EXISTING_USER}
					description={t('manage_cards.add_card.user_type_selection.existing_user_description')}
					checked={selectedUserType === USER_TYPES.EXISTING_USER}
					onSelected={onChangeSelectedUser}
				/>
			</div>
			<div className={styles.actionMenu}>
				{isMobile && (
					<Button type={ButtonTypes.button} size={ButtonSizes.small} color={ButtonColors.secondary} onClick={onClose}>
						{t('manage_cards.add_card.user_type_selection.cancel_button')}
					</Button>
				)}
				<Button type={ButtonTypes.button} size={ButtonSizes.small} color={ButtonColors.primary} onClick={onContinue}>
					{t('manage_cards.add_card.user_type_selection.continue_button')}
				</Button>
			</div>
		</div>
	);
};

export default UserTypeSelectionContent;
