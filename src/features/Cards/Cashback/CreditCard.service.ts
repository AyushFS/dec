import { sendGet } from '../../../services/Http.service';
import { CashbackDetails, CashbackRedemption, TotalCashbackEarned } from '../../../common/interface/cashback';
import { CURRENCY } from '../../../common/constant/enum/GeneralEnum';

const API_PREFIX = 'api/ccs';

export const getCashbackDetails = async (): Promise<CashbackDetails> => {
	const endpoint = `${API_PREFIX}/cashback/balance`;
	const response = await sendGet(endpoint);
	const responseData: CashbackDetails = response?.data?.data;
	return responseData;
};

export const getCashbackRedemptionStates = async (): Promise<CashbackRedemption | null> => {
	const endpoint = `${API_PREFIX}/cashback/redemption`;
	const response = await sendGet(endpoint);
	const responseData: any = response?.data?.data;
	if (responseData) {
		const accountNumberArray = responseData?.description.split(',');
		const cashbackRedemptionState = {
			amount: responseData?.amount,
			transferDate: responseData?.transfer_date,
			isTransferPending: responseData?.transfer_status !== 'CONFIRM',
			currency: CURRENCY[responseData?.country_code]?.value,
			accountNumber: responseData?.description.includes('uen')
				? accountNumberArray.pop()
				: accountNumberArray[accountNumberArray.length - 2],
		};
		return cashbackRedemptionState;
	}
	return null;
};

export const getTotalCashbackEarned = async (): Promise<TotalCashbackEarned> => {
	const endpoint = `${API_PREFIX}/cashback/history`;
	const response = await sendGet(endpoint);
	const responseData: TotalCashbackEarned = response?.data?.data;
	return { totalCashbackEarned: responseData?.totalCashbackEarned };
};
