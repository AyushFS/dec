import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { ReactFCC } from '../../../../../common/interface/react';
import { copyTextToClipboard } from '../../../../../common/utilities/common';
import useGlobalState from '../../../../GlobalState/useGlobalState';
import { getSecuredCardInfo } from '../../../Cards.service';
import QuickAction from '../../../components/QuickAction';
import { CardDetails, CardSecureInfo } from '../../interface';
import useManageCards from '../../UseManageCards';

interface CopyCardNumberProps {
	card: CardDetails;
}

const CopyCardNumber: ReactFCC<CopyCardNumberProps> = (props) => {
	const { t } = useTranslation();
	const { setSnackbar } = useGlobalState();
	const { cardSecureInfo, setCardSecureInfo } = useManageCards();
	const { card } = props;
	const copyText = (cardNumber: string) => {
		copyTextToClipboard(cardNumber);
		setSnackbar({ message: t('manage_cards.card_details.card_actions.copied_to_clipboard') });
	};

	const { isFetching, refetch } = useQuery(
		['get-secured-card-info-copy-card-number', card.cardUuid],
		() => getSecuredCardInfo(card.cardUuid),
		{
			onSuccess: (data: CardSecureInfo) => {
				setCardSecureInfo(data);
				copyText(data?.cardNumber || '');
			},
			...{ enabled: false, refetchOnWindowFocus: false },
		}
	);

	useEffect(() => {
		return () => {
			setCardSecureInfo(null);
		};
	}, [setCardSecureInfo]);

	const onCopyCardNumberClick = () => {
		if (isFetching) {
			return;
		}

		if (cardSecureInfo?.cardNumber) {
			copyText(cardSecureInfo?.cardNumber);
			return;
		}

		if (refetch) {
			refetch();
		}
	};
	return (
		<QuickAction
			icon="copy"
			processing={isFetching}
			title={t('manage_cards.card_details.card_actions.copy_card_number')}
			onClick={onCopyCardNumberClick}
		/>
	);
};

export default CopyCardNumber;
