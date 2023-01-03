import { ButtonTypes } from '../../../components/Button';
import { CardsSummary } from '../interface';

export interface CardsSectionState {
	loading: boolean;
	activeCardIndex: number;
}

export interface Director {
	name: string;
	mobile: string;
	email: string;
	uuid: string;
}

export interface GetCardsResponse {
	cards: Array<CardDetails>;
	summary: CardsSummary;
}

// [{ "cardNumber": "5202350003230814", "expiry": "2026-10", "cardStatus": "ACTIVATED", "totalLimit": "13000",
// "outstandingLimit": "0", "remainingLimit": "13000", "cardUuid": "b13d4fd7-5695-483f-b5cc-5140805d9d6e",
// "isMaster": true, "cardHashId": "7bf3c13ba32b494133d3ac6e0099ff5e" }
export interface CardDetails {
	cardType: string;
	createdAt: string;
	nameOnCard: string;
	canUnlock: boolean;
	cardNumber: string;
	cardStatus: string;
	outstandingLimit: string;
	totalLimit: string;
	remainingLimit: string;
	expiry: string;
	cvvNumber?: string;
	cardUuid: string;
	isLocked: boolean;
	isMaster: boolean;
	cardHashId: string;
	pendingDirectors: Array<{ email: string; name: string }>;
	spendPurposes: Array<SpendPurpose>;
	unableUnlockReasonCode: string;
	userUuid: string;
}

export interface SpendPurpose {
	spendPurposeName: string;
	spendPurposeUuid: string;
	uuid: string;
}

export interface SpendPurposeEntity {
	value: string;
	uuid: string;
}

export interface CardSecureInfo {
	cvv?: string;
	cardNumber?: string;
}

export interface CardsItemProps {
	item: CardDetails;
	index: number;
	isShowingDetails: boolean;
	selectedCardIndex: number;
	cardSecureInfo?: CardSecureInfo;
}

export interface CardDetailsSectionProps {
	selectedCard: CardDetails;
	cards: Array<CardDetails>;
	selectedCardIndex: number;
	detailsState: any | undefined;
	isScreenshotDisabled: boolean;
}

export interface CardsSectionProps {
	cardsList: Array<CardDetails>;
	isMasterUser: boolean;
	isAddCardEnabled: boolean;
	isCardsActivated: boolean;
}

export interface PreSubmissionSectionProps {
	selectedCard: CardDetails;
	postSubmissionCallback: (director: Director) => void;
}

export interface PostSubmissionSectionProps {
	selectedDirectors: Array<Director> | undefined;
	postSubmissionCallback: () => void;
}

export interface TransactionResponse {
	data: Array<TransactionData>;
	total: number;
}

export interface TransactionData {
	currency: string;
	amount: number;
	countryCode: string;
	createdAt: string;
	transactionStatus: string;
	uuid: string;
	cardUuid: string;
	category: string;
	payload: {
		debit_credit_indicator: string;
		transaction: {
			merchant_details: {
				name: string;
			};
		};
		payment_instrument: {
			masked_number: string;
		};
	};
}

export interface FooterProps {
	onPrimaryButtonClick?: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	onSecondaryButtonClick?: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	primaryButtonType?: ButtonTypes;
}

export interface UpdateCardLimitParams {
	cardUuid: string;
	limit: number;
	cardSpendPurposeUuid: string;
	spendPurposeUuid: string;
}
