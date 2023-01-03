import { sendGet } from '../../../services/Http.service';
import { TransactionEntity } from './types';

const API_PREFIX = 'api/ccs';

export const getTransactions = async (params: object = {}): Promise<TransactionEntity[]> => {
	const response = await sendGet(`${API_PREFIX}/transactions`, { params });
	return response?.data?.data;
};

export default getTransactions;
