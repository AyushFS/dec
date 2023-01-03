import { useQuery } from 'react-query';
import {
	encryptString,
	getProfilePermissions,
	getPublicKey,
	login,
	resend2faLoginOtp,
	verify2faLoginOtp,
} from './Auth.service';
import { AuthData } from './constants';

interface UseRequestLoginProps {
	onLoginSuccess: (response: any) => void;
	onLoginError: (error: any) => void;
	getFormData: () => {
		email: string;
		password: string;
	};
}

interface UseRequestLoginResponse {
	isFetchingPublicKey: boolean;
	publicKeyData: any;
	isPublicKeyError: boolean;
	refetchPublicKey: () => void;
	isFetchingLogin: boolean;
}

interface UseRequestOtpProps {
	onVerifyOtpSuccess: (response: any) => void;
	onVerifyOtpError: (error: any) => void;
	onResendOtpSuccess: (response: any) => void;
	onResendOtpError: (error: any) => void;
	getFormData: () => {
		otp: string;
		email: string;
		authData: AuthData;
	};
}

interface UseRequestOtpResponse {
	isFetchingVerifyOtp: boolean;
	refetchVerifyOtp: () => void;
	isFetchingResendOtp: boolean;
	refetchResendOtp: () => void;
}

const reactQueryDefaultOptions = {
	enabled: false,
	retry: false,
	retryOnMount: false,
	cacheTime: 0,
	refetchOnWindowFocus: false,
	refetchOnReconnect: false,
};

export const useRequestLogin = ({
	onLoginSuccess,
	onLoginError,
	getFormData,
}: UseRequestLoginProps): UseRequestLoginResponse => {
	const {
		isFetching: isFetchingPublicKey,
		data: publicKeyData,
		isError: isPublicKeyError,
		refetch: refetchPublicKey,
	} = useQuery('public-key', getPublicKey, {
		select: (data) => data?.data?.data,
		...reactQueryDefaultOptions,
	});

	const { isFetching: isFetchingLogin } = useQuery(
		'login',
		() => {
			const publicKey = publicKeyData as any;
			const { email, password } = getFormData();
			const encryptedPassword = encryptString(password, publicKey.public_key) as string;
			return login(email, encryptedPassword, publicKey.uuid);
		},
		{
			onSuccess: onLoginSuccess,
			onError: onLoginError,
			...reactQueryDefaultOptions,
			enabled: !isFetchingPublicKey && !!publicKeyData,
		}
	);

	return {
		isFetchingPublicKey,
		publicKeyData,
		isPublicKeyError,
		refetchPublicKey,
		isFetchingLogin,
	};
};

export const useRequestOtp = ({
	onVerifyOtpError,
	onVerifyOtpSuccess,
	onResendOtpError,
	onResendOtpSuccess,
	getFormData,
}: UseRequestOtpProps): UseRequestOtpResponse => {
	const { isFetching: isFetchingVerifyOtp, refetch: refetchVerifyOtp } = useQuery(
		'verify-otp',
		() => {
			const { otp, email, authData } = getFormData();
			return verify2faLoginOtp(otp, email, authData.refresh_token);
		},
		{
			onSuccess: onVerifyOtpSuccess,
			onError: onVerifyOtpError,
			...reactQueryDefaultOptions,
		}
	);

	const { isFetching: isFetchingResendOtp, refetch: refetchResendOtp } = useQuery(
		'resend-otp',
		() => {
			return resend2faLoginOtp();
		},
		{
			onSuccess: onResendOtpSuccess,
			onError: onResendOtpError,
			...reactQueryDefaultOptions,
		}
	);

	return {
		isFetchingVerifyOtp,
		refetchVerifyOtp,
		isFetchingResendOtp,
		refetchResendOtp,
	};
};

interface UseRequestProps {
	onSuccess: (response: any) => void;
	onError: (error: any) => void;
	options?: {} | null;
}

interface UseRequestResponse {
	isLoading: boolean;
	isFetching: boolean;
	data: any;
	isError: boolean;
}

export const useRequestPermissions = ({ onSuccess, onError, options }: UseRequestProps): UseRequestResponse => {
	const { isLoading, isFetching, data, isError } = useQuery('get-permissions', getProfilePermissions, {
		onSuccess,
		onError,
		...reactQueryDefaultOptions,
		...(options || {}),
	});

	return {
		isLoading,
		isFetching,
		data,
		isError,
	};
};
