import { CARD_STATUS } from '../../../../common/constant/enum/GeneralEnum';

export const card = {
	cardNumber: '123456XXXXXX1234',
	nameOnCard: 'Some Name',
	expiry: '2027-08',
	cardStatus: CARD_STATUS.ACTIVATED,
	totalLimit: '10000',
	outstandingLimit: '1000',
	remainingLimit: '9000',
	cardUuid: 'c7043e04-2a2d-411b-9643',
	isMaster: false,
	cardHashId: '966e68ce3f115d9f5f476ef130a02l3s',
	isLocked: false,
	canUnlock: false,
	unableUnlockReasonCode: '',
	pendingDirectors: [],
	spendPurposes: [
		{
			uuid: '5fa8efc1-c69c-4a2f-a240',
			spendPurposeUuid: '5da491f6-5f46-41d6-a91d',
			spendPurposeName: 'salary',
		},
	],
	cardType: 'CREDIT-CARD-MAIN',
	userUuid: '54854a38-3084-4191-a054',
	createdAt: '2022-08-22T08:11:55Z',
};

export const getCardsResponse = {
	summary: {},
	cards: [
		card,
		{
			cardNumber: '123456XXXXXX1234',
			nameOnCard: 'Some Name1',
			expiry: '2027-08',
			cardStatus: CARD_STATUS.PENDING_USER,
			totalLimit: '10000',
			outstandingLimit: '1000',
			remainingLimit: '9000',
			cardUuid: 'c7043e04-2a2d-411b-9644',
			isMaster: false,
			cardHashId: '966e68ce3f115d9f5f476ef130a02l3s',
			isLocked: false,
			canUnlock: false,
			unableUnlockReasonCode: '',
			pendingDirectors: [],
			spendPurposes: [
				{
					uuid: '5fa8efc1-c69c-4a2f-a240',
					spendPurposeUuid: '5da491f6-5f46-41d6-a91d',
					spendPurposeName: 'salary',
				},
			],
			cardType: 'CREDIT-CARD-MAIN',
			userUuid: '54854a38-3084-4191-a054',
			createdAt: '2022-08-22T08:11:55Z',
		},
	],
};

export default card;
