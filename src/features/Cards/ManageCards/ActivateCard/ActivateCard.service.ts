import { sendGet, sendPost } from '../../../../services/Http.service';
import { Director } from './interface';

const API_PREFIX = 'api/ccs';

interface RequestDirectorConsentResponse {
	message?: string;
}

export const getDirectors = async (cardUuid?: string): Promise<Director> => {
	const response = await sendGet(`${API_PREFIX}/consent/directors/${cardUuid}`);
	return response?.data?.data;
};

export const requestDirectorConsent = async (
	cardUuid: string,
	directorUuid: string
): Promise<RequestDirectorConsentResponse> => {
	const response = await sendPost(`${API_PREFIX}/consent/directors/${cardUuid}`, {
		params: {
			consents: [directorUuid],
		},
	});
	return response?.data?.data;
};
