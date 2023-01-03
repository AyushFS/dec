import { useContext } from 'react';
import ManageCardsContext from './ManageCardsProvider';

const useManageCards = () => {
	const context = useContext(ManageCardsContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within a ManageCardsProvider');
	}
	return context;
};

export default useManageCards;
