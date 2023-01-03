import { USER_ROLES } from '../constant/enum/GeneralEnum';

export interface UserEntity {
	user_uuid: string;
	user_fullname: string;
	user_email: string;
	user_mobile_phone_number: string;
	types: USER_ROLES[];
}

export interface User {
	userId: string;
	name: string;
	email: string;
	role: string;
	nationality: string;
	mobilePhoneNumber: string;
	mobilePhoneCountryCode: string;
}
