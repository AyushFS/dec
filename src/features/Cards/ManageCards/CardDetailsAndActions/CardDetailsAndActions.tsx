import React from 'react';
import { useTranslation } from 'react-i18next';
import { CARD_STATUS } from '../../../../common/constant/enum/GeneralEnum';
import { ReactFCC } from '../../../../common/interface/react';
import { useCurrencyFormat } from '../../../../common/utilities/currencyFormat';
import useGlobalState from '../../../GlobalState/useGlobalState';
import CreditCard from '../../components/CreditCard/CreditCard';
import { getLast4Digits, getNameOnCard, getUserRole } from '../../utils';
import CardActions from '../CardActions/CardActions';
import { CardDetails } from '../interface';
import useManageCards from '../UseManageCards';
import styles from './CardDetailsAndActions.module.scss';

interface CardDetailsAndActionsProps {
	card: CardDetails;
}

const CardDetailsAndActions: ReactFCC<CardDetailsAndActionsProps> = (props) => {
	const { t } = useTranslation();
	const { currentCountry } = useGlobalState();
	const { currencySymbolByCountry, formatCurrencyByCountry } = useCurrencyFormat(currentCountry);
	const { cardSecureInfo, showCardSecureInfo } = useManageCards();
	const cardSecureInfoData = showCardSecureInfo ? cardSecureInfo : null;
	const { card } = props;
	const isCardActive = card.cardStatus === CARD_STATUS.ACTIVATED;

	return (
		<div className={styles.CardDetails} data-testid="card-details-component">
			<div className={styles.CreditCardContainer}>
				<CreditCard card={card} cardSecureInfo={cardSecureInfoData} />
			</div>
			<div className={styles.CardDetailsName}>
				{card.nameOnCard && getNameOnCard(card.nameOnCard)}{' '}
				{card.cardNumber && <span>(.... {getLast4Digits(card.cardNumber)})</span>}
			</div>
			<div className={styles.CardDetailsRole}>{t(getUserRole(card.cardType))}</div>
			<div className={styles.CardDetailsAmount}>
				{currencySymbolByCountry} {formatCurrencyByCountry(card.outstandingLimit, false)}
			</div>
			{isCardActive && <CardActions card={card} />}
		</div>
	);
};

export default CardDetailsAndActions;
