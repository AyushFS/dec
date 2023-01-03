import React, { memo, FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button, { ButtonColors, ButtonSizes, ButtonTypes } from '../../../../../../components/Button';
import { useGetUsers } from '../../useRequest';
import styles from './ExistingUser.module.scss';
import BackButton from '../../BackButton/BackButton';
import { User, UserEntity } from '../../../../../../common/interface/user';
import ExistingUserOption from './ExistingUserOption/ExistingUserOption';
import { ExistingUserOptionType, ExistingUserProps } from './interface';
import getOptions from './utils';
import useAuth from '../../../../../Auth/useAuth';
import useAddCard from '../../useAddCard';
import useCards from '../../../../UseCards';

const ExistingUser: FC<ExistingUserProps> = memo(({ onCancel, onBack, onContinue }) => {
	const { auth } = useAuth();
	const { t } = useTranslation();
	const { setUserData } = useAddCard();
	const { cards, isFetchingCards } = useCards();

	const [selectedUser, setSelectedUser] = useState<ExistingUserOptionType | null>(null);
	const [users, setUsers] = useState<Array<ExistingUserOptionType>>([]);
	const [usersResponse, setUserResponse] = useState<Array<UserEntity>>([]);

	const onContinueHandler = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		if (selectedUser) {
			const userData: User = {
				userId: selectedUser?.key!,
				name: '',
				email: '',
				nationality: '',
				role: '',
				mobilePhoneNumber: '',
				mobilePhoneCountryCode: '',
			};

			setUserData((prevUserData) => ({ ...prevUserData, ...userData }));
			if (onContinue) onContinue();
		}
	};

	const { isLoading: isLoadingUsers } = useGetUsers({
		onSuccess: (response: UserEntity[]) => {
			setUserResponse(response || []);
		},
		onError: () => {
			setUserResponse([]);
		},
		options: { enabled: !!auth },
	});

	useEffect(() => {
		const options = getOptions(cards, usersResponse);
		setUsers(options);
		if (options?.length) {
			setSelectedUser(options[0]);
		}
	}, [cards, usersResponse]);

	const isLoading = isFetchingCards || isLoadingUsers;

	return (
		<div className={styles.container}>
			<BackButton onBack={onBack} />
			<div className={styles.header}>
				<span>{t('manage_cards.add_card.existing_user_page.page_title')}</span>
			</div>
			<span className={styles.message}>{t('manage_cards.add_card.existing_user_page.page_description')}</span>
			<div className={styles.userList}>
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<>
						{users.map((user) => (
							<ExistingUserOption
								{...user}
								selected={selectedUser?.key === user.key}
								onClick={() => {
									setSelectedUser(user);
								}}
							/>
						))}
					</>
				)}
			</div>

			<div className={styles.actionMenu}>
				<Button type={ButtonTypes.button} size={ButtonSizes.small} color={ButtonColors.secondary} onClick={onCancel}>
					{t('manage_cards.add_card.existing_user_page.cancel_button')}
				</Button>
				<Button
					type={ButtonTypes.submit}
					size={ButtonSizes.small}
					color={ButtonColors.primary}
					onClick={onContinueHandler}
				>
					{t('manage_cards.add_card.existing_user_page.continue_button')}
				</Button>
			</div>
		</div>
	);
});

ExistingUser.defaultProps = {};

export default ExistingUser;
