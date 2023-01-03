export interface Director {
	name: string;
	mobile: string;
	email: string;
	uuid: string;
}

export interface DirectorOptionType {
	title?: string;
	key?: string;
	disabled?: boolean;
	description?: string;
	uuid?: string;
}
