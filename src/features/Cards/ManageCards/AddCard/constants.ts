export const ADD_CARD_FLOW = 'ADD_CARD_FLOW';

export enum ADD_CARD_STEPS {
	USER_TYPE_SELECTION = 'user-type',
	USER_DETAILS_FORM = 'user-details',
	SELECT_EXISTING_USER = 'user-list',
	SPECIFY_LIMIT = 'specify-limit',
}

export enum USER_TYPES {
	NEW_USER = 'new-user',
	EXISTING_USER = 'existing-user',
}
