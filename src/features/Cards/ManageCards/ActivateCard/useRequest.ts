import { useMutation, useQuery } from 'react-query';
import { Director } from '../interface';
import { getDirectors, requestDirectorConsent } from './ActivateCard.service';

const reactQueryDefaultOptions = {
	enabled: false,
	retry: false,
	retryOnMount: false,
	cacheTime: 0,
	refetchOnWindowFocus: false,
	refetchOnReconnect: false,
};

interface useRequestDirectorConsentProps {
	onSuccess: () => void;
	onSettled?: () => void;
}

interface useGetDirectorsProps {
	onSuccess: (response: Array<Director>) => void;
	onSettled?: () => void;
	onError?: (error: any) => void;
	cardUuid: string;
	options: {};
}

export const useGetDirectors = ({ onSuccess, onError, options, cardUuid }: useGetDirectorsProps) => {
	const { isLoading, isFetching, data, isError } = useQuery('directors', () => getDirectors(cardUuid), {
		onSuccess,
		onError,
		...reactQueryDefaultOptions,
		...(options || {}),
	});

	return {
		isLoading,
		isFetching,
		data,
		isError,
	};
};

export const useRequestDirectorConsent = ({ onSuccess, onSettled }: useRequestDirectorConsentProps) => {
	const { mutate: reqDirectorConsent, isLoading } = useMutation(
		(params: { cardUuid: string; directorUuid: string }) =>
			requestDirectorConsent(params.cardUuid, params.directorUuid),
		{
			onSuccess,
			onSettled,
			onError: () => {
				console.log('there was an error');
			},
		}
	);

	return { reqDirectorConsent, isLoading };
};
