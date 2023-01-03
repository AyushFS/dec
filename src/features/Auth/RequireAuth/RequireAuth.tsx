import React, { useEffect, useState } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../useAuth';
import { ReactFCC } from '../../../common/interface/react';

interface RequireAuthProps {}

const RequireAuth: ReactFCC<RequireAuthProps> = () => {
	const { auth, loading } = useAuth();
	const [showComponent, setShowComponent] = useState(false);
	const location = useLocation();

	useEffect(() => {
		if (!loading) {
			setShowComponent(true);
		} else {
			setShowComponent(false);
		}
	}, [auth, loading]);

	if (!showComponent) return <>Loading...</>;

	if (!auth) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return <Outlet />;
};

export default RequireAuth;
