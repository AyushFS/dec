import { useContext } from 'react';
import { AddCardContext } from './AddCardProvider';

const useAddCard = () => {
	const context = useContext(AddCardContext);
	if (context === undefined) {
		throw new Error('useAddCard must be used within a AddCardProvider');
	}
	return context;
};

export default useAddCard;
