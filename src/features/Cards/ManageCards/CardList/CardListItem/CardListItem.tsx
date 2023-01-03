import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactFCC } from '../../../../../common/interface/react';
import './CardListItem.scss';
import { CardDetails } from '../../interface';
import FsIcon from '../../../../../components/FsIcon';
import { CARD_STATUS } from '../../../../../common/constant/enum/GeneralEnum';
import { useCurrencyFormat } from '../../../../../common/utilities/currencyFormat';
import useGlobalState from '../../../../GlobalState/useGlobalState';
import { getLast4Digits, getUserRole } from '../../../utils';
import StatusMsg from '../../../components/StatusMsg';
import CreditCard from '../../../components/CreditCard/CreditCard';
import useManageCards from '../../UseManageCards';

const icons = {
	lock: (
		<svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M7 4H6.5V3C6.5 1.62 5.38 0.5 4 0.5C2.62 0.5 1.5 1.62 1.5 3V4H1C0.45 4 0 4.45 0 5V10C0 10.55 0.45 11 1 11H7C7.55 11 8 10.55 8 10V5C8 4.45 7.55 4 7 4ZM4 8.5C3.45 8.5 3 8.05 3 7.5C3 6.95 3.45 6.5 4 6.5C4.55 6.5 5 6.95 5 7.5C5 8.05 4.55 8.5 4 8.5ZM5.55 4H2.45V3C2.45 2.145 3.145 1.45 4 1.45C4.855 1.45 5.55 2.145 5.55 3V4Z"
				fill="#757575"
			/>
		</svg>
	),
	check: (
		<svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M9.45705 1.20711L3.10349 7.56066L0.499939 4.95711L1.20705 4.25L3.10349 6.14645L8.74994 0.5L9.45705 1.20711Z"
				fill="#08C0A6"
			/>
		</svg>
	),
	pending: (
		<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M9.5 2L7.5 4H9C9 5.655 7.655 7 6 7C5.495 7 5.015 6.875 4.6 6.65L3.87 7.38C4.485 7.77 5.215 8 6 8C8.21 8 10 6.21 10 4H11.5L9.5 2ZM3 4C3 2.345 4.345 1 6 1C6.505 1 6.985 1.125 7.4 1.35L8.13 0.62C7.515 0.23 6.785 0 6 0C3.79 0 2 1.79 2 4H0.5L2.5 6L4.5 4H3Z"
				fill="#3E7EFF"
			/>
		</svg>
	),
};

const statusMsgs = {
	locked: (size: number, title: string) => <StatusMsg size={size} title={title} icon={icons.lock} classes="locked" />,
	active: (size: number, title: string) => <StatusMsg size={size} title={title} icon={icons.check} classes="active" />,
	activationPending: (size: number, title: string) => (
		<StatusMsg size={size} title={title} icon={icons.pending} classes="activation-pending" />
	),
};

interface CardListItemProps {
	onCardClick: (card: CardDetails) => void;
	card: CardDetails;
}

const CardListItem: ReactFCC<CardListItemProps> = (props) => {
	const { isMobile, currentCountry } = useGlobalState();
	const { t } = useTranslation();
	const { currencySymbolByCountry, formatCurrencyByCountry } = useCurrencyFormat(currentCountry);
	const { currentCard } = useManageCards();
	const { card, onCardClick } = props;
	const isCurrentCard = currentCard?.cardUuid === card.cardUuid;

	const getCardStatusMsg = (status: string, isLocked: boolean, size: number): React.ReactNode => {
		if (status === CARD_STATUS.ACTIVATED) {
			if (isLocked) {
				return statusMsgs.locked(size, t('manage_cards.card_status.locked'));
			}
			return statusMsgs.active(size, t('manage_cards.card_status.active'));
		}
		return statusMsgs.activationPending(size, t('manage_cards.card_status.activation_pending'));
	};

	return (
		<div className="card-list-item-component" data-testid="card-list-item-component">
			<div
				className={['card-list-item', isMobile ? 'pv-4' : 'p-4', isCurrentCard ? 'selected' : ''].join(' ')}
				onClick={() => onCardClick(card)}
				data-testid="card-list-item-trigger"
			>
				<div className="card-list-item__image_container">
					<div className="card-list-item__image">
						<div className="credit-card">
							<CreditCard card={card} />
						</div>
						<span className="card-list_item__image_status_icon">
							{getCardStatusMsg(card.cardStatus, card.isLocked, 8)}
						</span>
					</div>
				</div>
				<div className={['card-list-item__details', isMobile ? 'ph-3' : 'ph-5'].join(' ')}>
					<div className="card-list-item__details_meta">
						<div className="card-list-item__name">
							{card.nameOnCard}
							<span className="card-list-item__card-number">(.... {getLast4Digits(card.cardNumber)})</span>
						</div>
						<div className="card-list-item__meta">
							<div className="card-list-item__role">{t(getUserRole(card.cardType))}</div>
							<div className="card-list-item__status">{getCardStatusMsg(card.cardStatus, card.isLocked, 16)}</div>
						</div>
					</div>
					<div className="spacer" />
					<div className="card-list-item__amount">
						<div className="card-list-item__amount-spend">
							<span className="card-list-item__amount-spend-value">
								{`${currencySymbolByCountry} ${formatCurrencyByCountry(parseFloat(card.remainingLimit), false)}`}
							</span>
						</div>
						<div className="card-list-item__amount-limit">
							<span className="card-list-item__amount-limit-value">
								/ {formatCurrencyByCountry(card.totalLimit, false)}
							</span>
						</div>
					</div>
				</div>
				<div className="card-list-item__action ph-3">
					<FsIcon>arrow-right</FsIcon>
				</div>
			</div>
		</div>
	);
};

export default CardListItem;
