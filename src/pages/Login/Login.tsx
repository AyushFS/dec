import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAnalytics from '../../features/Analytics/useAnalytics';
import MixpanelEvent from '../../features/Analytics/constants';
import LoginForm from '../../features/Auth/LoginForm';
import useAuth from '../../features/Auth/useAuth';

function Login() {
	const { auth, loading } = useAuth();
	const navigate = useNavigate();
	const { trackEvent } = useAnalytics();

	trackEvent(MixpanelEvent.APP_VIEW_LOGIN_SCREEN, {});

	useEffect(() => {
		if (!loading && auth) {
			return navigate('/');
		}
		return () => {};
	}, [loading, auth, navigate]);

	return (
		<div className="login-page" data-testid="login-page">
			<LoginForm />
		</div>
	);
}

export default Login;
