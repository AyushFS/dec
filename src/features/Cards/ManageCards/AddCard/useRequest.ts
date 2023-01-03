import { useMutation, useQuery } from 'react-query';
import { UserEntity } from '../../../../common/interface/user';
import { SpendPurposeEntity } from '../interface';
import { addCard, getNationalities, getSpendPurposes, getUsers } from './AddCard.service';
import { Nationalities } from './types';

const reactQueryDefaultOptions = {
	enabled: false,
	retry: false,
	retryOnMount: false,
	cacheTime: 0,
	refetchOnWindowFocus: false,
	refetchOnReconnect: false,
};

interface UseRequestAddCardResponse {
	addCardFn: any;
	isLoading: boolean;
}

interface UseRequestAddCardRequestProps {
	onSuccess: () => void;
	onSettled?: () => void;
}

interface UseRequestNationalitiesResponse {
	isLoading: boolean;
	isFetching: boolean;
	data: Nationalities | undefined;
	isError: boolean;
}

interface UseRequestNationalitiesProps {
	onSuccess: (response: Nationalities) => void;
	onError: () => void;
	options: {};
}

interface UseGetSpendPurposesResponse {
	isLoading: boolean;
	isFetching: boolean;
	data: SpendPurposeEntity[] | undefined;
	isError: boolean;
}

interface UseGetSpendPurposesProps {
	onSuccess: (response: SpendPurposeEntity[]) => void;
	onError: () => void;
	options: {};
}

interface UseGetUsersResponse {
	isLoading: boolean;
	isFetching: boolean;
	data: UserEntity[] | undefined;
	isError: boolean;
}

interface UseGetUsersProps {
	onSuccess: (response: UserEntity[]) => void;
	onError: () => void;
	options: {};
}

export const useRequestAddCard = ({
	onSuccess,
	onSettled,
}: UseRequestAddCardRequestProps): UseRequestAddCardResponse => {
	const { mutate: addCardFn, isLoading } = useMutation(addCard, {
		onSuccess,
		onSettled,
		onError: () => {
			console.log('there was an error');
		},
	});

	return { addCardFn, isLoading };
};

export const useRequestNationalities = ({
	onSuccess,
	onError,
	options,
}: UseRequestNationalitiesProps): UseRequestNationalitiesResponse => {
	const { isLoading, isFetching, data, isError } = useQuery('nationalities', getNationalities, {
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

export const useGetSpendPurposes = ({
	onSuccess,
	onError,
	options,
}: UseGetSpendPurposesProps): UseGetSpendPurposesResponse => {
	const { isLoading, isFetching, data, isError } = useQuery('spendPurposes', getSpendPurposes, {
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

export const useGetUsers = ({ onSuccess, onError, options }: UseGetUsersProps): UseGetUsersResponse => {
	const { isLoading, isFetching, data, isError } = useQuery('existingUsers', getUsers, {
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
