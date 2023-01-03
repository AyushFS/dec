import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { ReactFCC } from '../../../../../common/interface/react';
import { IconTypes } from '../../../../../components/FsIcon/constants';
import { useRequestToggleCardLockStatus } from '../../../useRequest';
import QuickAction from '../../../components/QuickAction';
import { CardDetails } from '../../interface';
import { lockIcon, unlockIcon } from './constants';

interface ToggleLockCardProps {
	card: CardDetails;
}

const ToggleLockCard: ReactFCC<ToggleLockCardProps> = (props) => {
	const queryClient = useQueryClient();
	const { t } = useTranslation();
	const { card } = props;
	const [isLocked, setIsLocked] = useState<boolean>(card.isLocked);
	const updateCards = () => {
		queryClient.setQueryData('get-cards', (oldData: any) => {
			const newData = {
				...oldData,
				cards: oldData.cards.map((oldCard: any) => {
					if (oldCard.cardUuid === card.cardUuid) {
						return {
							...oldCard,
							isLocked: !oldCard.isLocked,
						};
					}
					return oldCard;
				}),
			};
			return newData;
		});
	};
	const params = { uuid: card.cardUuid };
	const options = { enabled: false, refetchOnWindowFocus: false };
	const { isFetching, refetch } = useRequestToggleCardLockStatus({
		onSuccess: () => {
			setIsLocked(!isLocked);
			updateCards();
		},
		onError: () => {},
		params,
		options,
	});
	const onToggleLockCardClick = () => {
		if (isFetching || !refetch) return;
		refetch();
	};
	const ToggleLockCardText = t(`manage_cards.card_details.card_actions.${isLocked ? 'unlock_card' : 'lock_card'}`);
	const ToggleLockCardIcon = !isLocked ? unlockIcon : lockIcon;
	return (
		<QuickAction
			icon={ToggleLockCardIcon}
			iconType={IconTypes.svg}
			title={ToggleLockCardText}
			onClick={onToggleLockCardClick}
			processing={isFetching}
		/>
	);
};

export default ToggleLockCard;
