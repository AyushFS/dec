import { Buffer } from 'buffer';
import { sendGet, sendPost, sendPut } from '../../services/Http.service';
import { decrypt, getPublicPrivateKeyPair } from './Crypto.service';
import { CardSecureInfo, GetCardsResponse, TransactionData, TransactionResponse } from './ManageCards/interface';
import { BankAccountDetails } from './Statements/components/PayBill/interface';
import { Bill, NotifyRepaymentTransferred, StatementsResponse } from './Statements/interface';

const API_PREFIX = 'api/ccs';
export const getStatements = async (
	memberUuid: string,
	page: number,
	size: number = 10
): Promise<StatementsResponse> => {
	const endpoint = `${API_PREFIX}/statements`;
	const response = await sendGet(
		endpoint,
		{
			params: {
				country_id: 'SG',
				member_uuid: memberUuid,
				page,
				size,
				order_by: 'created_at',
				order_descending: true,
				include_count: true,
			},
		},
		{}
	);
	const responseData: StatementsResponse = response?.data?.data;
	return responseData;
};

export const getBankAccountDetails = async (uuid: string): Promise<BankAccountDetails> => {
	const endpoint = `${API_PREFIX}/cards/${uuid}/payment-info`;
	const response = await sendGet(endpoint);
	const responseData: BankAccountDetails = response?.data?.data;
	return responseData;
};

export const getStatementsBill = async (): Promise<Bill> => {
	const endpoint = `${API_PREFIX}/statements/bill`;
	const response = await sendGet(endpoint);
	const responseData: Bill = response?.data?.data;
	return responseData;
};

export const notifyRepaymentTransferred = async (): Promise<NotifyRepaymentTransferred> => {
	const response = await sendPost(`${API_PREFIX}/ext/repayments/notify-ops`);
	const responseData: NotifyRepaymentTransferred = response?.data?.data;
	return responseData;
};

export const getCards = async (): Promise<GetCardsResponse> => {
	const endpoint = `${API_PREFIX}/cards`;
	const response = await sendGet(endpoint);
	const responseData: GetCardsResponse = response?.data?.data;
	return responseData;
};

/**
 * Get key pair from crypto service, encode public key
 * and send request to Credit Card Service to fetch card secure info.
 * Decrypt the response and return.
 * @param cardUuid
 */
export const getSecuredCardInfo = async (cardUuid: string): Promise<CardSecureInfo> => {
	const keyPair = await getPublicPrivateKeyPair();
	const base64encodedKey = Buffer.from(keyPair.publicKeyPem as any).toString('base64');
	const response: any = await sendGet(
		`${API_PREFIX}/cards/${cardUuid}/secure-info`,
		{
			params: {
				publicKey: base64encodedKey,
			},
		},
		{}
	);
	const decryptedData = await decrypt(response?.data?.data?.data);
	if (decryptedData) {
		return JSON.parse(decryptedData as any);
	}
	return {};
};

export const getTransactions = async (params: object = {}): Promise<TransactionResponse> => {
	const endpoint = `${API_PREFIX}/transactions`;

	const response = await sendGet(endpoint, { params });
	const responseData: any = response?.data;
	const transactions: { data: Array<TransactionData>; total: number } = responseData?.data;
	return transactions;
};

export const toggleCardLockStatus = async (uuid: string) => {
	const response = await sendPut(`api/ccs/cards/${uuid}/toggle-lock-status`);
	return {
		responseStatusCode: response.status,
	};
};

export default getCards;
