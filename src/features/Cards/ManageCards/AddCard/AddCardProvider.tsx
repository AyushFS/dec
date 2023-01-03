import React, { useMemo, createContext, useState } from 'react';
import { ReactFCC } from '../../../../common/interface/react';
import { User } from '../../../../common/interface/user';
import { AddCardContextType } from './types';

export const defaultAddCardContext: AddCardContextType = {
	userData: {
		userId: '',
		name: '',
		email: '',
		role: '',
		nationality: '',
		mobilePhoneNumber: '',
		mobilePhoneCountryCode: '',
	},
	setUserData: () => {},
	spendLimit: '',
	setSpendLimit: () => {},
	spendPurpose: '',
	setSpendPurpose: () => {},
};

export const AddCardContext = createContext<AddCardContextType>(defaultAddCardContext);

interface AddCardProviderProps {}

export const AddCardProvider: ReactFCC<AddCardProviderProps> = ({ children }) => {
	const [userData, setUserData] = useState<User>(defaultAddCardContext.userData);
	const [spendLimit, setSpendLimit] = useState<string>('');
	const [spendPurpose, setSpendPurpose] = useState<string>('');

	const contextValue = useMemo(
		() => ({
			userData,
			setUserData,
			setSpendLimit,
			spendLimit,
			spendPurpose,
			setSpendPurpose,
		}),
		[userData, setUserData, setSpendLimit, spendLimit, spendPurpose, setSpendPurpose]
	);

	return <AddCardContext.Provider value={contextValue}>{children}</AddCardContext.Provider>;
};
