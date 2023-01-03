import { USER_ROLES } from '../../../../../../../common/constant/enum/GeneralEnum';

export const userData = {
	userId: '',
	name: 'test',
	email: 'test@gmail.com',
	nationality: 'Thai',
	role: 'CREDIT-CARD-MAIN',
	mobilePhoneNumber: '12345678',
	mobilePhoneCountryCode: 'SG',
};

export const authContextValue = {
	auth: {
		access_token: '',
		auth_user_uuid: '',
		token_type: '',
		refresh_token: '',
		expires_in: 0,
		scope: '',
		member_id: 0,
		intercom_hash: '',
		next_step: '',
		default_role: '',
		first_name: '',
		member_uuid: '',
	},
	assignableRoles: [USER_ROLES.CREDIT_CARD_MAIN],
	permissions: [],
	setAuth: () => {},
	loading: false,
	setLoading: () => {},
};
