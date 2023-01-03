import React, { useCallback, useEffect, useRef } from 'react';
import { CARD_STATUS } from '../../../../common/constant/enum/GeneralEnum';
import { ReactFCC } from '../../../../common/interface/react';
import { generateUniqueId } from '../../../../common/utilities/common';
import { CardDetails, CardSecureInfo } from '../../ManageCards/interface';
import { getNameOnCard, maskCardNumber, splitCardNumber } from '../../utils';
import { creditCardOriginalWidth } from './constants';
import styles from './CreditCard.module.scss';

interface CreditCardProps {
	card: CardDetails;
	cardSecureInfo?: CardSecureInfo | null;
}

const CreditCard: ReactFCC<CreditCardProps> = (props) => {
	const eventListeners = useRef<any>();
	const { card, cardSecureInfo } = props;
	const isLocked = card.cardStatus === CARD_STATUS.ACTIVATED && card.isLocked;

	const cardNumber = cardSecureInfo ? splitCardNumber(cardSecureInfo?.cardNumber) : maskCardNumber(card.cardNumber);
	const cvvNumber = cardSecureInfo && cardSecureInfo?.cvv ? cardSecureInfo?.cvv : '•••';
	const nameOnCard = cardSecureInfo ? getNameOnCard(card.nameOnCard) : null;
	const expiry = cardSecureInfo ? `${card.expiry.slice(-2)} / ${card.expiry.slice(2, 4)}` : `•• / ••`;
	const cardData = {
		cardNumber,
		nameOnCard,
		cvvNumber,
		expiry,
	};

	const uniqueClassName = `card-unique-id-${generateUniqueId()}`;
	const creditCardImageAttrs = {
		className: [styles.CreditCardImage, isLocked && styles['is-locked'], uniqueClassName].filter((s) => s).join(' '),
		'data-testid': 'credit-card-image',
	};

	const rescaleCreditCard = useCallback(() => {
		const creditCard = document.querySelector(`.${uniqueClassName}`);
		const creditCardWidth = creditCard?.clientWidth;
		const scale = creditCardWidth ? creditCardWidth / creditCardOriginalWidth : 1;
		document.getElementById(uniqueClassName)?.setAttribute('style', `transform: scale(${scale})`);
	}, [uniqueClassName]);

	useEffect(() => {
		rescaleCreditCard();
		eventListeners.current = rescaleCreditCard;
		window.addEventListener('resize', eventListeners.current, true);
		return () => window.removeEventListener('resize', eventListeners.current, true);
	}, [uniqueClassName, rescaleCreditCard, eventListeners]);

	return (
		<div className={styles.CreditCard} data-testid="credit-card-component">
			<div {...creditCardImageAttrs} />
			<div className={styles.CreditCardDetails} data-testid="credit-card-details" id={uniqueClassName}>
				<div className={styles.CreditCardNumber} data-testid="credit-card-number">
					{cardData.cardNumber.split(' ').map((number: string, index: number) => {
						const key = `${number}${index}`;
						return number === '••••' ? (
							<span key={key} className={styles.dotContainer}>
								{number}
							</span>
						) : (
							<span className={styles.number} key={number}>
								{number}
							</span>
						);
					})}
				</div>
				<div className={styles.CreditCardSecrets}>
					<div className={styles.CreditCardValidThru}>
						<div className={styles.label}>Valid Thru</div>
						<div className={styles.number} data-testid="credit-card-expiry">
							{cardData.expiry.includes('•') ? (
								<span className={styles.dotContainer}>{cardData.expiry}</span>
							) : (
								cardData.expiry
							)}
						</div>
					</div>
					<div className={styles.CreditCardCvv}>
						<div className={styles.label}>CVV</div>
						<div className={styles.number} data-testid="credit-card-cvv">
							{cardData.cvvNumber.includes('•') ? (
								<span className={styles.dotContainer}>{cardData.cvvNumber}</span>
							) : (
								cardData.cvvNumber
							)}
						</div>
					</div>
				</div>
				{cardData.nameOnCard && (
					<div className={styles.CreditCardName} data-testid="credit-card-name">
						{cardData.nameOnCard}
					</div>
				)}
			</div>
		</div>
	);
};

export default CreditCard;
