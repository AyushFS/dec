import { TRANSACTION_TYPE } from '../../../../common/constant/enum/GeneralEnum';
import { TRANSACTION_STATUS } from '../constants';
import { DateWiseTransactions } from '../types';

const transactions: DateWiseTransactions = [
	{
		date: 'September, 2020',
		data: [
			{
				id: '1',
				currency: 'SGD',
				createdAt: '15 Aug',
				merchantName: 'sample category',
				category: 'Food and Beverage',
				cardHolderName: 'username',
				maskedCardNumber: '.... .... .... 1234',
				amount: '2000',
				transactionType: TRANSACTION_TYPE.DEBIT,
				transactionStatus: TRANSACTION_STATUS.SUCCESS,
				originalCurrency: 'USD',
				originalAmount: '123',
			},
			{
				id: '2',
				currency: 'SGD',
				createdAt: '15 Aug',
				merchantName: 'sample category 1',
				category: 'Food and Beverage',
				cardHolderName: 'username1',
				maskedCardNumber: '.... .... .... 1234',
				amount: '2000',
				transactionType: TRANSACTION_TYPE.CREDIT,
				transactionStatus: TRANSACTION_STATUS.SUCCESS,
				originalCurrency: 'SGD',
				originalAmount: '123',
			},
			{
				id: '3',
				currency: 'SGD',
				createdAt: '15 Aug',
				merchantName: 'sample category 2',
				category: 'Food and Beverage',
				cardHolderName: 'username2',
				maskedCardNumber: '.... .... .... 1234',
				amount: '2000',
				transactionType: TRANSACTION_TYPE.DEBIT,
				transactionStatus: TRANSACTION_STATUS.SUCCESS,
				originalCurrency: 'SGD',
				originalAmount: '123',
			},
		],
	},
];

export default transactions;
