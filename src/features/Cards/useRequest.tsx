import { useQuery } from 'react-query';
import {
	getBankAccountDetails,
	getCards,
	getSecuredCardInfo,
	getStatements,
	getStatementsBill,
	getTransactions,
	notifyRepaymentTransferred,
	toggleCardLockStatus,
} from './Cards.service';
import { getCashbackDetails, getTotalCashbackEarned } from './Cashback/CreditCard.service';

interface UseRequestProps {
	onSuccess: (response: any) => void;
	onError: (error: any) => void;
	params?: any;
	options?: any;
}

interface UseRequestResponse {
	isLoading: boolean;
	isFetching: boolean;
	refetch: () => void;
	data: any;
	isError: boolean;
}

const reactQueryDefaultOptions = {
	// enabled: false,
	// retry: false,
	// retryOnMount: false,
	// cacheTime: 0,
	refetchOnWindowFocus: false,
	// refetchOnReconnect: false,
};

export const useRequestGetCards = ({ onSuccess, onError, options }: UseRequestProps): UseRequestResponse => {
	const { isLoading, isFetching, refetch, data, isError } = useQuery('get-cards', getCards, {
		onSuccess,
		onError,
		...reactQueryDefaultOptions,
		...options,
	});

	return {
		isLoading,
		isFetching,
		refetch,
		data,
		isError,
	};
};

export const useRequestGetTransactions = ({ onSuccess, onError, params }: UseRequestProps): UseRequestResponse => {
	const { isLoading, isFetching, refetch, data, isError } = useQuery(
		['get-transactions', JSON.stringify(params || {})],
		() => getTransactions(params),
		{
			onSuccess,
			onError,
			...reactQueryDefaultOptions,
		}
	);

	return {
		isLoading,
		isFetching,
		refetch,
		data,
		isError,
	};
};

export const useRequestToggleCardLockStatus = ({
	onSuccess,
	onError,
	params,
	options,
}: UseRequestProps): UseRequestResponse => {
	const { isLoading, isFetching, refetch, data, isError } = useQuery(
		['toggle-lock-status', params.uuid],
		() => toggleCardLockStatus(params.uuid),
		{
			onSuccess,
			onError,
			...reactQueryDefaultOptions,
			...options,
		}
	);

	return {
		isLoading,
		isFetching,
		refetch,
		data,
		isError,
	};
};

export const useRequestGetSecuredCardInfo = ({
	onSuccess,
	onError,
	params,
	options,
}: UseRequestProps): UseRequestResponse => {
	const { isLoading, isFetching, refetch, data, isError } = useQuery(
		['get-secured-card-info', params.cardUuid],
		() => getSecuredCardInfo(params.cardUuid),
		{
			onSuccess,
			onError,
			...reactQueryDefaultOptions,
			...options,
		}
	);

	return {
		isLoading,
		isFetching,
		refetch,
		data,
		isError,
	};
};

export const useRequestGetStatements = ({
	onSuccess,
	onError,
	params,
	options,
}: UseRequestProps): UseRequestResponse => {
	const { isLoading, isFetching, refetch, data, isError } = useQuery(
		['get-statements', JSON.stringify(params || {})],
		() => getStatements(params.memberUuid, params.page, params.size),
		{
			onSuccess,
			onError,
			...reactQueryDefaultOptions,
			...options,
		}
	);

	return {
		isLoading,
		isFetching,
		refetch,
		data,
		isError,
	};
};

export const useRequestGetStatementsBill = ({ onSuccess, onError, options }: UseRequestProps): UseRequestResponse => {
	const { isLoading, isFetching, refetch, data, isError } = useQuery(
		['get-statements-bill'],
		() => getStatementsBill(),
		{
			onSuccess,
			onError,
			...reactQueryDefaultOptions,
			...options,
		}
	);

	return {
		isLoading,
		isFetching,
		refetch,
		data,
		isError,
	};
};

export const useRequestGetBankAccountDetails = ({
	onSuccess,
	onError,
	params,
	options,
}: UseRequestProps): UseRequestResponse => {
	const { isLoading, isFetching, refetch, data, isError } = useQuery(
		['get-bank-account-details', JSON.stringify(params || {})],
		() => getBankAccountDetails(params.uuid),
		{
			onSuccess,
			onError,
			...reactQueryDefaultOptions,
			...options,
		}
	);

	return {
		isLoading,
		isFetching,
		refetch,
		data,
		isError,
	};
};

export const useRequestNotifyRepaymentTransferred = ({
	onSuccess,
	onError,
	options,
}: UseRequestProps): UseRequestResponse => {
	const { isLoading, isFetching, refetch, data, isError } = useQuery(
		'notify-repayment-transferred',
		() => notifyRepaymentTransferred(),
		{
			onSuccess,
			onError,
			...reactQueryDefaultOptions,
			...options,
		}
	);

	return {
		isLoading,
		isFetching,
		refetch,
		data,
		isError,
	};
};

export const useRequestGetTotalCashbackEarned = ({
	onSuccess,
	onError,
	options,
}: UseRequestProps): UseRequestResponse => {
	const { isLoading, isFetching, refetch, data, isError } = useQuery(
		'get-total-cashback-earned',
		() => getTotalCashbackEarned(),
		{
			onSuccess,
			onError,
			...reactQueryDefaultOptions,
			...options,
		}
	);

	return {
		isLoading,
		isFetching,
		refetch,
		data,
		isError,
	};
};

export const useRequestGetCashbackDetails = ({ onSuccess, onError, options }: UseRequestProps): UseRequestResponse => {
	const { isLoading, isFetching, refetch, data, isError } = useQuery(
		'get-cashback-details',
		() => getCashbackDetails(),
		{
			onSuccess,
			onError,
			...reactQueryDefaultOptions,
			...options,
		}
	);

	return {
		isLoading,
		isFetching,
		refetch,
		data,
		isError,
	};
};

export default { useRequestGetCards };
