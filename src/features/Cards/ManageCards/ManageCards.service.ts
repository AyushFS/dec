import { sendPut } from '../../../services/Http.service';

const API_PREFIX = 'api/ccs';

interface UpdateCardLimitResponse {
	responseStatusCode: number;
	cardSpendPurposeUuid: string;
}

const updateCardLimit = async (
	cardUuid: string,
	limit: number,
	cardSpendPurposeUuid: string,
	spendPurposeUuid: string
): Promise<UpdateCardLimitResponse> => {
	const response = await sendPut(`${API_PREFIX}/cards/${cardUuid}/limits`, {
		cardSpendPurposeUuid,
		spendPurposeUuid,
		newLimit: limit,
	});
	return {
		responseStatusCode: response.status,
		cardSpendPurposeUuid: response?.data?.data?.cardSpendPurposeUuid,
	};
};

export default updateCardLimit;
