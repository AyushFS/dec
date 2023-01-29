import React, { useEffect, useState } from 'react';
import { ReactFCC } from '../../../common/interface/react';
import { useRequestLogin } from '../useRequest';
import useAuth from '../useAuth';
import Input, { InputTypes } from '../../../components/Input';
import Button, { ButtonColors, ButtonTypes } from '../../../components/Button';
import Logo, { LogoTypes } from '../../../components/Logo';
import Card from '../../../components/Card';
import './LoginForm.scss';
import { validationCheck } from '../../../common/utilities/validationChecker/ValidationChecker';
import { ValidationPolicy } from '../../../common/utilities/validationChecker/ValidationPolicy';
import useAnalytics from '../../Analytics/useAnalytics';
import MixpanelEvent from '../../Analytics/constants';
import useGlobalState from '../../GlobalState/useGlobalState';
import { AuthData } from '../constants';
import OtpModal from '../OtpModal/OtpModal';

interface LoginFormProps {}

const LoginForm: ReactFCC<LoginFormProps> = () => {
	const { loaders, setLoader } = useGlobalState();
	const { trackEvent } = useAnalytics();
	const { setAuth } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [hasTouched, setHasTouched] = useState<boolean>(false);
	const [validationError, setValidationError] = useState<any>({
		email: { errorMsg: '' },
		password: { errorMsg: '' },
	});
	const [authData, setAuthData] = useState<AuthData>({} as AuthData);
	const [authError, setAuthError] = useState<any>(null);
	const [show2fa, setShow2fa] = useState(false);

	const { isFetchingPublicKey, isPublicKeyError, refetchPublicKey, isFetchingLogin } = useRequestLogin({
		onLoginSuccess: (response) => {
			setAuthData(response?.data);
			setAuthError(null);
			setShow2fa(true);
		},
		onLoginError: (error: any) => {
			setAuthError(error.response?.data || error.code);
			setShow2fa(false);
			setAuthData({} as AuthData);
		},
		getFormData: () => {
			return { email, password };
		},
	});

	useEffect(() => {
		setLoader('login', isFetchingPublicKey || isFetchingLogin);
	}, [isFetchingPublicKey, isFetchingLogin, setLoader]);

	const handleValueChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		e.preventDefault();
		setHasTouched(true);
		if (e.target.name === 'email') {
			await setEmail(e.target.value);
		} else if (e.target.name === 'password') {
			await setPassword(e.target.value);
		}
	};

	const validateEmailAndPassword = () => {
		const emailValidationResult = validationCheck(email, ValidationPolicy.email)[0];
		const passowrdValidationResult = validationCheck(password, ValidationPolicy.password)[0];
		setValidationError({
			email: emailValidationResult,
			password: passowrdValidationResult,
		});
		return emailValidationResult.success && passowrdValidationResult.success;
	};

	const handleLogin = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		trackEvent(MixpanelEvent.APP_LOGIN, {});
		const isValid = validateEmailAndPassword();
		if (!isValid) return;
		refetchPublicKey();
	};

	const handleCancel = () => {
		setShow2fa(false);
		setAuthData({} as AuthData);
	};
	const onOtpSuccess = (data: any) => {
		if (!data) return;
		setAuth(data);
		(window as any)?.FS?.identify(data.auth_user_uuid, {
			displayName: data.first_name,
			email,
		});
	};

	useEffect(() => {
		setHasTouched(true);
		if (hasTouched) {
			validateEmailAndPassword();
		}
		// eslint-disable-next-line
	}, [email, password]);

	return (
		<div className="login-form" data-testid="login-form">
			<div className="container">
				<div className="row row--align-center-small row--align-middle-small">
					<div className="col col--12/12-small col--8/12-medium col--6/12-large">
						<div className="text-center pv-8" data-testid="logo">
							<Logo type={LogoTypes.fs} />
						</div>
						<form onSubmit={handleLogin}>
							<Card>
								<h4>Title</h4>
								<div>
									<Input
										name="email"
										type={InputTypes.text}
										value={email}
										placeholder="Email"
										label="Email"
										onChange={handleValueChange}
										autoComplete="off"
										errorMessage={validationError.email.errorMsg}
										autoFocus
										testId="email-input"
									/>
									<Input
										name="password"
										type={InputTypes.password}
										value={password}
										label="Password"
										onChange={handleValueChange}
										errorMessage={validationError.password.errorMsg}
										testId="password-input"
									/>
								</div>
								{isPublicKeyError && (
									<div className="mv-3 p-3 bg-warning" data-testid="public-key-error">
										<div style={{ fontWeight: 'bold' }}>There seem to be some problem</div>
										<small>Please try again later</small>
									</div>
								)}
								{authError && (
									<div className="mv-3 p-3 bg-warning">
										<div style={{ fontWeight: 'bold' }}>
											{authError.error_description || 'Login credentials are invalid'}
										</div>
										<small>Please try again or reset your password</small>
									</div>
								)}
								<Button
									type={ButtonTypes.submit}
									block
									color={ButtonColors.primary}
									disabled={loaders.login}
									testId="login-button"
								>
									Login
								</Button>
							</Card>
						</form>
					</div>
				</div>
			</div>

			{show2fa && <OtpModal email={email} authData={authData} onCancel={handleCancel} onSuccess={onOtpSuccess} />}
		</div>
	);
};

export default LoginForm;
