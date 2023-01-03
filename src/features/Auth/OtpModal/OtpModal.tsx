import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { useTranslation } from 'react-i18next';
import { ReactFCC } from '../../../common/interface/react';
import { useRequestOtp } from '../useRequest';
import Input from '../../../components/Input';
import { InputTypes } from '../../../components/Input/constants';
import Button, { ButtonColors, ButtonTypes } from '../../../components/Button';
import './OtpModal.scss';
import useGlobalState from '../../GlobalState/useGlobalState';
import { validationCheck } from '../../../common/utilities/validationChecker/ValidationChecker';
import { ValidationPolicy } from '../../../common/utilities/validationChecker/ValidationPolicy';
import { AuthData } from '../constants';

interface OtpModalProps {
	email: string;
	authData: AuthData;
	onCancel: () => void;
	onSuccess: (...args: any) => void;
}

const OtpModal: ReactFCC<OtpModalProps> = (props: OtpModalProps) => {
	const { t } = useTranslation();
	const { loaders, setLoader } = useGlobalState();
	const { email, authData, onCancel, onSuccess } = props;
	const [error, setError] = useState<any>(null);
	const [otp, setOtp] = useState('');
	const [otpTimeLeftSeconds, setOtpTimeLeftSeconds] = useState(authData.totp_expires_in);
	const [otpValidationError, setOtpValidationError] = useState<any>({
		otp: { errorMsg: '' },
	});

	const { refetchVerifyOtp, isFetchingVerifyOtp, refetchResendOtp, isFetchingResendOtp } = useRequestOtp({
		onVerifyOtpSuccess: (response) => {
			setError(null);
			onSuccess(response?.data);
			setOtpTimeLeftSeconds(0);
		},
		onVerifyOtpError: (err: any) => {
			setError(err.response?.data || err.code);
			setOtpTimeLeftSeconds(0);
		},
		onResendOtpSuccess: (response) => {
			setOtpTimeLeftSeconds(response.data?.totp_expires_in);
			setError(null);
		},
		onResendOtpError: (err: any) => {
			setError(err.code);
		},
		getFormData: () => {
			return { otp, email, authData };
		},
	});

	const handleValueChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setOtp(e.target.value);
	};

	const validateOtp = () => {
		const otpValidationResult = validationCheck(otp, ValidationPolicy.otp)[0];
		setOtpValidationError({
			otp: otpValidationResult,
		});
		return otpValidationResult.success;
	};

	const handleVerifyOpt = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const isValid = validateOtp();
		if (!isValid) return;
		setOtpTimeLeftSeconds(0);
		refetchVerifyOtp();
	};

	const handleCancel = () => {
		onCancel();
	};

	const otpTimeLeftSecondsRenderer = ({ minutes, seconds, completed }: any) => {
		return completed ? (
			<p data-testid="countdown-expired-text">{t('login.2fa.otp_has_expired')}</p>
		) : (
			<span>
				{t('login.2fa.otp_will_expire_in')}
				{otpTimeLeftSeconds > 0 && (
					<span data-testid="countdown-time-text">
						{minutes}:{seconds}
					</span>
				)}
				<br />
				{t('login.2fa.didn_t_receive_otp')}
			</span>
		);
	};

	useEffect(() => {
		setLoader('verifyOtp', isFetchingVerifyOtp);
	}, [isFetchingVerifyOtp, setLoader]);

	useEffect(() => {
		setLoader('resendOtp', isFetchingResendOtp);
	}, [isFetchingResendOtp, setLoader]);

	useEffect(() => {
		validateOtp();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [otp]);

	return (
		<div className="docs__forced-viewport" data-testid="otp-modal">
			<div
				className="modal-container is-open"
				role="dialog"
				aria-labelledby="modal-header"
				aria-describedby="modal-body"
			>
				<div className="modal">
					<form onSubmit={handleVerifyOpt}>
						<div className="modal__content p-8">
							<div className="modal__header" id="modal-header">
								<h2 className="h5">{t('login.2fa.title')}</h2>
							</div>
							<div className="modal__body" id="modal-body">
								<div className="text-center">
									<p>We have sent a SMS OTP to your phone</p>
									<p>{authData.mobile_number}</p>
									<small>Wrong number? Please contact your designated Relationship Manager</small>
									{!isFetchingVerifyOtp && (
										<Countdown date={Date.now() + otpTimeLeftSeconds} renderer={otpTimeLeftSecondsRenderer} />
									)}
									<a href="#" onClick={refetchResendOtp} data-testid="resend-link">
										{t('login.2fa.resend')}
									</a>
									{loaders.resendOtp && <p data-testid="resending-msg">Resending...</p>}
								</div>
								<div className="mv-4">
									<Input
										type={InputTypes.text}
										value={otp}
										placeholder="123456"
										label={t('login.2fa.code')}
										onChange={handleValueChange}
										autoComplete="off"
										errorMessage={t(otpValidationError.otp.errorMsg)}
										testId="otp-input"
										autoFocus
									/>
								</div>
							</div>
							<div className="modal__actions m-0">
								{error && (
									<div className="mv-3 p-3 bg-warning" data-testid="validate-otp-error">
										<div style={{ fontWeight: 'bold' }}>
											{error.error_description || t('login.2fa.there_seem_to_be_some_problem')}
										</div>
										<small>{t('login.2fa.please_try_again_later')}</small>
									</div>
								)}
								<Button
									block
									type={ButtonTypes.submit}
									color={ButtonColors.primary}
									disabled={loaders.verifyOtp}
									testId="verify-button"
								>
									{t('login.2fa.verify_otp')}
								</Button>
								<Button
									block
									color={ButtonColors.secondary}
									disabled={loaders.verifyOtp}
									onClick={handleCancel}
									testId="cancel-button"
								>
									{t('login.2fa.cancel')}
								</Button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default OtpModal;
