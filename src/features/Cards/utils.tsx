import { USER_ROLES } from '../../common/constant/enum/GeneralEnum';
import { CardDetails } from './ManageCards/interface';

export function maskInformation(value: string, actualLength: number, maskPlaceholder: string = '•'): string {
	return value.padStart(actualLength, maskPlaceholder);
}

export function splitCardNumber(cardNumber: string = ''): string {
	return cardNumber.match(/.{1,4}/g)?.join(' ') || '';
}

export function maskCardNumber(cardNumber: string = '', maskPlaceholder: string = '•') {
	const trimmed = cardNumber.trim();
	return splitCardNumber(maskInformation(trimmed.substr(12, 4), 16, maskPlaceholder));
}

export function getLast4Digits(cardNumber: string = '') {
	const trimmed = cardNumber.trim();
	return trimmed.substr(12, 4);
}

export function getNameOnCard(nameOnCard: string = '') {
	const nameArray = nameOnCard.trim().split(' ');
	return nameArray.length > 1 ? `${nameArray[0]} ${nameArray[1]?.charAt(0)}.` : `${nameArray[0]}.`;
}

export function getUserRole(type: string) {
	switch (type) {
		case USER_ROLES.CREDIT_CARD_MAIN:
			return 'Master Admin';
		case USER_ROLES.CREDIT_CARD_ADMIN:
			return 'Admin';
		case USER_ROLES.CREDIT_CARD_ADDON:
			return 'User';
		default:
			return '';
	}
}

export const getMasterCardUuid = (cards: CardDetails[]) => {
	return cards.find((data: CardDetails) => data.isMaster === true)?.cardUuid || '';
};

export const sortCards = (cards: CardDetails[]): CardDetails[] => {
	return (cards || []).sort((a, b) => {
		if (+new Date(a.createdAt) > +new Date(b.createdAt)) {
			return -1;
		}
		if (+new Date(a.createdAt) < +new Date(b.createdAt)) {
			return 1;
		}
		return 0;
	});
};
