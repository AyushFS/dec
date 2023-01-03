import { UserEntity } from '../../../../common/interface/user';
import { sendGet, sendPost } from '../../../../services/Http.service';
import { SpendPurposeEntity } from '../interface';
import { AddCardResponse, Nationalities } from './types';

const API_PREFIX = 'api/ccs';

export const addCard = async (formData: FormData): Promise<AddCardResponse> => {
	const response = await sendPost(`${API_PREFIX}/sub/card`, formData);
	return response?.data?.data;
};

export const getNationalities = async (): Promise<Nationalities> => {
	const response = await sendGet(`${API_PREFIX}/enums/nationalities`);
	return response?.data?.data;
};

export const getSpendPurposes = async (): Promise<SpendPurposeEntity[]> => {
	const response = await sendGet(`${API_PREFIX}/enums/spend_purpose`);
	return response?.data?.data;
};

export const getUsers = async (): Promise<UserEntity[]> => {
	const response = await sendGet(`${API_PREFIX}/users`);
	return response?.data?.data;
};
