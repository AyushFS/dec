export enum COUNTRY_CODE {
	SG = 'SG',
	MY = 'MY',
	ID = 'ID',
	ZI = 'ZI',
	TH = 'TH',
}

export enum OPERATOR_NAMES {
	equal = 'Equal to',
	not_equal = 'Not equal to',
	gt = 'Greator than',
	gtorequal = 'Greator than or equal to',
	lt = 'Less than',
	ltorequal = 'Less than or equal to',
	in = 'In',
	not_in = 'Not in',
	like = 'Like',
	between = 'Between',
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

export enum STORAGE_KEY {
	SECURE_INFO_PRIVATE_KEY = 'SECURE_INFO_PRIVATE_KEY',
	SECURE_INFO_PUBLIC_KEY = 'SECURE_INFO_PUBLIC_KEY',
}

export enum DEVICE_TYPE {
	MOBILE = 'mobile',
	TABLET = 'tablet',
	LAPTOP = 'laptop',
	DESKTOP = 'desktop',
}
