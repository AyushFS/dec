import React, { createContext, Dispatch, SetStateAction, useMemo, useState } from 'react';
import { ReactFCC } from '../../../common/interface/react';
import { CardDetails, CardSecureInfo } from './interface';

interface ManageCardsContextType {
	currentCard: CardDetails;
	setCurrentCard: Dispatch<SetStateAction<CardDetails>>;
	showCardSecureInfo: boolean;
	setShowCardSecureInfo: Dispatch<SetStateAction<boolean>>;
	cardSecureInfo: CardSecureInfo | null;
	setCardSecureInfo: Dispatch<SetStateAction<CardSecureInfo | null>>;
}

const defaultManageCardContext = {
	currentCard: {} as CardDetails,
	setCurrentCard: () => {},
	showCardSecureInfo: false,
	setShowCardSecureInfo: () => {},
	cardSecureInfo: null,
	setCardSecureInfo: () => {},
};

const ManageCardsContext = createContext<ManageCardsContextType>(defaultManageCardContext);

interface ManageCardsProviderProps {}

export const ManageCardsProvider: ReactFCC<ManageCardsProviderProps> = ({ children }) => {
	const [currentCard, setCurrentCard] = useState<CardDetails>(defaultManageCardContext.currentCard);
	const [cardSecureInfo, setCardSecureInfo] = useState<CardSecureInfo | null>(defaultManageCardContext.cardSecureInfo);
	const [showCardSecureInfo, setShowCardSecureInfo] = useState<boolean>(defaultManageCardContext.showCardSecureInfo);

	const ManageCardsProviderValue = useMemo(
		(): ManageCardsContextType => ({
			currentCard,
			setCurrentCard,
			showCardSecureInfo,
			setShowCardSecureInfo,
			cardSecureInfo,
			setCardSecureInfo,
		}),
		[currentCard, setCurrentCard, showCardSecureInfo, setShowCardSecureInfo, cardSecureInfo, setCardSecureInfo]
	);

	return <ManageCardsContext.Provider value={ManageCardsProviderValue}>{children}</ManageCardsContext.Provider>;
};

export default ManageCardsContext;
