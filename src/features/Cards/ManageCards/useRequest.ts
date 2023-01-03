import { useMutation } from 'react-query';
import { UpdateCardLimitParams } from './interface';
import updateCardLimit from './ManageCards.service';

interface UpdateRequestCardLimitProps {
	onSuccess: () => void;
	onSettled?: () => void;
}

interface UpdateRequestCardLimitResponse {
	updateCardLimit: (params: UpdateCardLimitParams) => void;
	isLoading: boolean;
}

const useRequestUpdateCardLimit = ({
	onSuccess,
	onSettled,
}: UpdateRequestCardLimitProps): UpdateRequestCardLimitResponse => {
	const { mutate: updateLimit, isLoading } = useMutation(
		(params: UpdateCardLimitParams) =>
			updateCardLimit(params.cardUuid, params.limit, params.cardSpendPurposeUuid, params.spendPurposeUuid),
		{
			onSuccess,
			onSettled,
			onError: () => {
				console.log('there was an error in updating card limit');
			},
		}
	);

	return {
		updateCardLimit: updateLimit,
		isLoading,
	};
};

export default useRequestUpdateCardLimit;
