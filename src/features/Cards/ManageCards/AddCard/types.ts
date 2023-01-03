import { User } from '../../../../common/interface/user';

export interface AddCardProps {
	redirectURL?: string;
	allowDefaultRoute?: boolean;
}
export interface AddCardContextType {
	userData: User;
	spendLimit: string;
	spendPurpose: string;
	setSpendLimit: React.Dispatch<React.SetStateAction<string>>;
	setSpendPurpose: React.Dispatch<React.SetStateAction<string>>;
	setUserData: React.Dispatch<React.SetStateAction<User>>;
}

interface Nationality {
	code: string;
}

export type Nationalities = Array<Nationality>;

export interface FormData {
	[key: string]: string | number;
}

export interface AddCardResponse {
	message?: string;
}
