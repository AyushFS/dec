export interface AuthData {
	access_token: string;
	token_type: string;
	refresh_token: string;
	expires_in: number;
	scope: string;
	totp_expires_in: number;
	next_step: string;
	mobile_number: string;
	email: string;
}

export interface ProfilePermissionResponse {
	permissions: string[];
	assignableRoles: string[];
	type: string;
	uuid: string;
}
