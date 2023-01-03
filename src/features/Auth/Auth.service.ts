import JSEncrypt from 'jsencrypt';
import { sendGet, sendPost } from '../../services/Http.service';
import { setLocalStorage } from '../../services/Localstorage.service';
import { ProfilePermissionResponse } from './constants';

const setBearerToken = (bearerToken: string): void => {
	setLocalStorage('bearerToken', bearerToken);
};

export const getPublicKey = () => {
	const endpoint = 'api/v2/security/public_key';
	return sendGet(endpoint);
};

export const encryptString = (str: string, public_key: string) => {
	const encryptor = new JSEncrypt();
	encryptor.setPublicKey(public_key);
	return encryptor.encrypt(str);
};

export const login = (username: string, encryptedPassword: string, uuid: string) => {
	const endpoint = 'mobile_login/oauth/token?auth_type=password&biometric_login_enabled=false';
	const formData = new FormData();
	formData.append('client_id', 'scfs_client');
	formData.append('country_id', 'SG');
	formData.append('grant_type', 'password');
	formData.append('password', encryptedPassword);
	formData.append('scope', 'read');
	formData.append('username', username);
	formData.append('uuid', uuid);
	formData.append('otp_channel', 'sms');

	return sendPost(endpoint, formData, undefined, { 'Content-Type': 'multipart/form-data' }).then((response) => {
		setBearerToken(response.data.access_token);
		return response;
	});
};

export const logout = async () => {
	const endpoint = 'mobile_login/user/logout';

	try {
		const response = await sendPost(endpoint);
		return {
			code: response.data?.code,
			responseStatusCode: response.status,
		};
	} catch (error: any) {
		if (error?.response?.data?.error_description) {
			console.log(`Logout API request error : ${error?.response?.data?.error_description}`);
			throw new Error(error?.response?.data?.error_description);
		} else {
			console.log(`Logout API request error : ${JSON.stringify(error)}`);
			throw error;
		}
	}
};

export const verify2faLoginOtp = (otp: string, username: string, refreshToken: string) => {
	const endpoint = 'mobile_login/oauth/token';
	const formData = new FormData();
	formData.append('client_id', 'scfs_client');
	formData.append('grant_type', 'refresh_token');
	formData.append('auth_type', '2fa');
	formData.append('country_id', 'SG');
	formData.append('refresh_token', refreshToken);
	formData.append('2fa', otp);

	return sendPost(endpoint, formData, undefined, { 'Content-Type': 'multipart/form-data' }).then((response) => {
		setBearerToken(response.data.access_token);
		return response;
	});
};

export const resend2faLoginOtp = () => {
	const endpoint = `mobile_login/scfs/2fa/resend`;
	return sendGet(endpoint);
};

export const getProfilePermissions = async (): Promise<ProfilePermissionResponse> => {
	const endpoint = 'api/ccs/me/permissions';
	const response = await sendGet(endpoint);
	const responseData: any = response?.data?.data;
	return {
		assignableRoles: responseData?.assignable_roles,
		type: responseData?.type,
		permissions: responseData?.permissions,
		uuid: responseData?.uuid,
	};
};
