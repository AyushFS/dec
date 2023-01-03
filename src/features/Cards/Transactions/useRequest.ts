import { useQuery } from 'react-query';
import { getTransactions } from './Transactions.service';
import { GetTransactionsResponse } from './types';

const reactQueryDefaultOptions = {
	enabled: false,
	retry: false,
	retryOnMount: false,
	cacheTime: 0,
	refetchOnWindowFocus: false,
	refetchOnReconnect: false,
};

interface UseRequestTransactionsResponse {
	isLoading: boolean;
	isFetching: boolean;
	data: GetTransactionsResponse;
	isError: boolean;
	refetch: () => void;
}

interface UseRequestTransactionsProps {
	onSuccess: (response: GetTransactionsResponse) => void;
	onError: (err: any) => void;
	options?: {};
}

const useRequestTransactions = ({
	onSuccess,
	onError,
	options,
}: UseRequestTransactionsProps): UseRequestTransactionsResponse => {
	const { isLoading, isFetching, data, refetch, isError } = useQuery('get-transactions', getTransactions, {
		onSuccess,
		onError,
		...reactQueryDefaultOptions,
		...(options || {}),
	});
	return {
		isLoading,
		isFetching,
		isError,
		refetch,
		data: data || { data: [], total: 0 },
	};
};

export default useRequestTransactions;
