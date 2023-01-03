import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactFCC } from '../../../../../common/interface/react';
import { IconNames } from '../../../../../components/FsIcon/constants';
import { useRequestGetSecuredCardInfo } from '../../../useRequest';
import QuickAction from '../../../components/QuickAction';
import { CardDetails, CardSecureInfo } from '../../interface';
import useManageCards from '../../UseManageCards';

interface ShowCardDetailsProps {
	card: CardDetails;
}

const ShowCardDetails: ReactFCC<ShowCardDetailsProps> = (props) => {
	const { t } = useTranslation();
	const { cardSecureInfo, setCardSecureInfo, showCardSecureInfo, setShowCardSecureInfo } = useManageCards();
	const { card } = props;
	const icon = showCardSecureInfo ? IconNames.eye : IconNames['eye-closed'];
	const label = t(
		`manage_cards.card_details.card_actions.${showCardSecureInfo ? 'hide_card_details' : 'show_card_details'}`
	);

	const { isFetching, refetch } = useRequestGetSecuredCardInfo({
		onSuccess: (data: CardSecureInfo) => {
			setCardSecureInfo(data);
			setShowCardSecureInfo(!showCardSecureInfo);
		},
		onError: () => {},
		params: { cardUuid: card.cardUuid },
		options: { enabled: false, refetchOnWindowFocus: false },
	});

	useEffect(() => {
		return () => {
			setShowCardSecureInfo(false);
			setCardSecureInfo(null);
		};
	}, [setShowCardSecureInfo, setCardSecureInfo]);

	const onShowCardDetailsClick = () => {
		if (isFetching) {
			return;
		}

		if (cardSecureInfo) {
			setShowCardSecureInfo(!showCardSecureInfo);
			return;
		}

		if (refetch) {
			refetch();
		}
	};

	return <QuickAction icon={icon} processing={isFetching} title={label} onClick={onShowCardDetailsClick} />;
};

export default ShowCardDetails;
