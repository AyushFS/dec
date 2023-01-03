import React, { FC, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button, { ButtonColors, ButtonSizes, ButtonTypes } from '../../../../../components/Button';
import useAuth from '../../../../Auth/useAuth';
import { DirectorOptionType } from '../interface';
import DirectorOption from '../DirectorOption';
import { useGetDirectors, useRequestDirectorConsent } from '../useRequest';
import { mapDirectorToDirectorOption } from '../utils';
import styles from './DirectorSelection.module.scss';

interface DirectorSelectionProps {
	cardUuid: string;
	onCancel: () => void;
	onContinue: () => void;
	selectedDirector: DirectorOptionType | undefined;
	setSelectedDirector: React.Dispatch<React.SetStateAction<DirectorOptionType | undefined>>;
}

const DirectorSelection: FC<DirectorSelectionProps> = memo(
	({ cardUuid, onCancel, onContinue, selectedDirector, setSelectedDirector }) => {
		const { t } = useTranslation();
		const { auth } = useAuth();
		const [directorOptions, setDirectorOptions] = useState<Array<DirectorOptionType>>([]);

		useGetDirectors({
			onSuccess: (response) => {
				const directorOptionList = mapDirectorToDirectorOption(response || []);
				const firstNonDisabledDirector = directorOptionList.find((director) => director.disabled === false);
				setDirectorOptions(directorOptionList);
				setSelectedDirector(firstNonDisabledDirector);
			},
			onError: (e) => {
				console.log('error', e);
			},
			options: { enabled: !!auth },
			cardUuid,
		});

		const { reqDirectorConsent } = useRequestDirectorConsent({
			onSuccess: onContinue,
		});

		const onContinueClick = () => {
			if (selectedDirector) {
				reqDirectorConsent({ cardUuid, directorUuid: selectedDirector.uuid! });
				if (onContinue) onContinue();
			}
		};

		return (
			<div className={styles.container}>
				<span className={styles.message}>{t('manage_cards.activate_card.director_selection.page_description')}</span>
				<span className={styles.message}>{t('manage_cards.activate_card.director_selection.contact_us')}</span>
				{directorOptions && (
					<div className={styles.userList}>
						{directorOptions.map((directorOption) => (
							<DirectorOption
								showRadio
								selected={selectedDirector?.uuid === directorOption.uuid}
								onClick={() => {
									setSelectedDirector(directorOption);
								}}
								{...directorOption}
							/>
						))}
					</div>
				)}
				<div className={styles.actionMenu}>
					<Button type={ButtonTypes.button} size={ButtonSizes.small} color={ButtonColors.secondary} onClick={onCancel}>
						{t('manage_cards.activate_card.director_selection.cancel_button')}
					</Button>
					<Button
						type={ButtonTypes.submit}
						size={ButtonSizes.small}
						color={ButtonColors.primary}
						onClick={onContinueClick}
					>
						{t('manage_cards.activate_card.director_selection.continue_button')}
					</Button>
				</div>
			</div>
		);
	}
);

DirectorSelection.defaultProps = {};

export default DirectorSelection;
