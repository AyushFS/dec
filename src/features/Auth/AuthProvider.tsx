import React, { createContext, Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { ReactFCC } from '../../common/interface/react';
import { ProfilePermissionResponse } from './constants';
import { useRequestPermissions } from './useRequest';

interface Auth {
	access_token: string;
	auth_user_uuid: string;
	token_type: string;
	refresh_token: string;
	expires_in: number;
	scope: string;
	member_id: number;
	intercom_hash: string | null;
	next_step: string;
	default_role: string;
	first_name: string;
	member_uuid: string;
}

interface AuthContextType {
	auth: Auth | null;
	setAuth: Dispatch<SetStateAction<Auth | null>>;
	permissions: string[];
	assignableRoles: string[];
	loading: boolean;
	setLoading: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
	auth: null,
	setAuth: (): void => {},
	permissions: [],
	assignableRoles: [],
	loading: true,
	setLoading: (): void => {},
});

interface AuthProviderProps {}

export const AuthProvider: ReactFCC<AuthProviderProps> = ({ children }) => {
	const loadAuthData = (): Auth | null => JSON.parse(localStorage.getItem('user') as string);
	const [auth, setAuth] = useState<Auth | null>(loadAuthData());
	const [permissions, setPermissions] = useState<string[]>([]);
	const [assignableRoles, setAssignableRoles] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const AuthProviderValue = useMemo(
		(): AuthContextType => ({ auth, setAuth, permissions, assignableRoles, loading, setLoading }),
		[auth, permissions, assignableRoles, loading, setLoading]
	);

	useRequestPermissions({
		onSuccess: (response: ProfilePermissionResponse) => {
			setPermissions(response.permissions);
			setAssignableRoles(response.assignableRoles);
		},
		onError: () => {
			setPermissions([]);
			setAssignableRoles([]);
		},
		options: { enabled: !!auth },
	});

	useEffect(() => {
		if (auth) {
			localStorage.setItem('user', JSON.stringify(auth));
		} else {
			setPermissions([]);
			localStorage.removeItem('user');
			localStorage.removeItem('bearerToken');
		}
	}, [auth, loading]);

	return <AuthContext.Provider value={AuthProviderValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
