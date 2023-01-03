export enum NAVIGATION_STACK {
	POST_AUTH_TAB = 'PostAuthTabNavigator',
	POST_AUTH_STACK = 'PostAuthStackNavigator',
	HOME_STACK = 'HomeStack',
	CARDS_STACK = 'CardsStack',
	PROFILE_STACK = 'ProfileStack',
}

export enum USER_TYPE {
	MASTER = 'MASTER',
	SUB = 'SUB',
}

export enum CARD_STATUS {
	ACTIVATED = 'ACTIVATED',
	INACTIVE = 'INACTIVE',
	PENDING_USER = 'PENDING_USER',
	PENDING_DIRECTOR = 'PENDING_DIRECTOR',
	PENDING_INVITED_USER = 'PENDING_INVITED_USER',
	PENDING_CARD_PROVISION = 'PENDING_CARD_PROVISION',
}

export enum COUNTRY_CODE {
	SG = 'SG',
	MY = 'MY',
	ID = 'ID',
	ZI = 'ZI',
	TH = 'TH',
}

export const COUNTRY_NAME: any = {
	[COUNTRY_CODE.SG]: 'Singapore',
	[COUNTRY_CODE.MY]: 'Malaysia',
	[COUNTRY_CODE.ID]: 'Indonesia',
	[COUNTRY_CODE.ZI]: 'Indonesia 2',
	[COUNTRY_CODE.TH]: 'Thailand',
};

export const CURRENCY: any = {
	[COUNTRY_CODE.SG]: {
		value: 'SGD',
		symbol: 'S$',
	},
	[COUNTRY_CODE.MY]: {
		value: 'MYR',
		symbol: 'RM',
	},
	[COUNTRY_CODE.ID]: {
		value: 'IDR',
		symbol: 'Rp.',
	},
	[COUNTRY_CODE.ZI]: {
		value: 'IDR',
		symbol: 'Rp.',
	},
	[COUNTRY_CODE.TH]: {
		value: 'THB',
		symbol: '฿',
	},
	undefined: {
		value: 'N/A',
		symbol: 'N/A',
	},
};

export const SHORT_MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export enum TRANSACTION_TYPE {
	DEBIT = 'D',
	CREDIT = 'C',
}

export enum STORAGE_KEY {
	SECURE_INFO_PRIVATE_KEY = 'SECURE_INFO_PRIVATE_KEY',
	SECURE_INFO_PUBLIC_KEY = 'SECURE_INFO_PUBLIC_KEY',
}

export enum AUTH_NEXT_STEPS {
	TWO_FA = '2fa',
	DASHBOARD = 'dashboard',
}

export enum APP_STATE {
	INACTIVE = 'inactive',
	ACTIVE = 'active',
	BACKGROUND = 'background',
}

export enum APP_BLOCKER_TYPE {
	FORCE_UPDATE = 'force_update',
	SECURITY = 'security',
	INSTALLER_SECURITY = 'installer_security',
	NONE = 'none',
}
export enum USER_PERMISSIONS {
	USERS_VIEW = 'users.view',
	USERS_UPDATE = 'users.update',
	SPEND_LIMIT_UPDATE = 'spend-limits.update',
	CARD_LOCK_STATUS_UPDATE = 'card-lock-status.update',
	CARDS_ADD = 'cards.add',
	CARDS_VIEW = 'cards.view',
	CARDS_SUMMARY_VIEW = 'cards-summary.view',
	CARDS_INFO_VIEW = 'cards-masked-info.view',
	CARDS_ACTIVATE = 'cards.activate',
	CARDS_USE = 'cards.use',
	FACILITY_LIMIT_REQUEST = 'facility-limit.request',
	OFFER_VIEW = 'offer.view',
	REWARD_VIEW = 'reward.view',
	CASHBACK_VIEW = 'cashback.view',
	CASHBACK_EARNED_VIEW = 'cashback-earned.view',
	CASHBACK_REDEMPTION = 'cashback-redeemtion.request',
	TRANSACTIONS_VIEW = 'transactions.view',
	TRANSACTIONS_DOWNLOAD = 'transactions.download',
	STATEMENTS_VIEW = 'statements.view',
	BILLS_PAY = 'bills.pay',
	REPAYMENTS_MAKE = 'repayments.make',
}

export enum USER_ROLES {
	CREDIT_CARD_MAIN = 'CREDIT-CARD-MAIN',
	CREDIT_CARD_ADMIN = 'CREDIT-CARD-ADMIN',
	CREDIT_CARD_ADDON = 'CREDIT-CARD-ADD-ON',
}

export enum DEVICE_TYPE {
	MOBILE = 'mobile',
	TABLET = 'tablet',
	LAPTOP = 'laptop',
	DESKTOP = 'desktop',
}
