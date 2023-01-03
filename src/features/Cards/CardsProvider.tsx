import React, { createContext, Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { CashbackDetails, TotalCashbackEarned } from '../../common/interface/cashback';
import { ReactFCC } from '../../common/interface/react';
import useGlobalState from '../GlobalState/useGlobalState';
import { CardsSummary } from './interface';
import { CardDetails, GetCardsResponse } from './ManageCards/interface';
import { Bill } from './Statements/interface';
import {
	useRequestGetCards,
	useRequestGetCashbackDetails,
	useRequestGetStatementsBill,
	useRequestGetTotalCashbackEarned,
} from './useRequest';
import { getMasterCardUuid } from './utils';

interface CardsContextType {
	cards: CardDetails[];
	setCards: Dispatch<SetStateAction<CardDetails[]>>;
	bill: Bill;
	setBill: Dispatch<SetStateAction<Bill>>;
	cardsSummary: CardsSummary;
	setCardsSummary: Dispatch<SetStateAction<CardsSummary>>;
	masterCardUuid: string;
	reFetchCards: () => void;
	isFetchingCards: boolean;
	isLoadingCards: boolean;
	getTotalCashbackEarnedQuery: any;
	totalCashbackEarned: number;
	getCashbackDetailsQuery: any;
	cashbackDetails: CashbackDetails;
	getStatementsBillQuery: any;
}

const defaultCardsContext = {
	cards: [],
	setCards: () => {},
	bill: {} as Bill,
	setBill: () => {},
	cardsSummary: {
		outstandingLimit: '',
		remainingLimit: '',
		totalLimit: '',
	},
	setCardsSummary: () => {},
	masterCardUuid: '',
	reFetchCards: () => {},
	isFetchingCards: false,
	isLoadingCards: false,
	getTotalCashbackEarnedQuery: {},
	totalCashbackEarned: 0,
	getCashbackDetailsQuery: {},
	cashbackDetails: {} as CashbackDetails,
	getStatementsBillQuery: {},
};

const CardsContext = createContext<CardsContextType>(defaultCardsContext);

interface CardsProviderProps {}

export const CardsProvider: ReactFCC<CardsProviderProps> = ({ children }) => {
	const { setLoader } = useGlobalState();
	const [cards, setCards] = useState<CardDetails[]>(defaultCardsContext.cards);
	const [cardsSummary, setCardsSummary] = useState<CardsSummary>(defaultCardsContext.cardsSummary);
	const [masterCardUuid, setMasterCardUuid] = useState<string>(defaultCardsContext.masterCardUuid);
	const [bill, setBill] = useState<Bill>({} as Bill);
	const [totalCashbackEarned, setTotalCashbackEarned] = useState<number>(0);
	const [cashbackDetails, setCashbackDetails] = useState<CashbackDetails>({} as CashbackDetails);

	const {
		isLoading: isLoadingCards,
		isFetching: isFetchingCards,
		refetch: reFetchCards,
	} = useRequestGetCards({
		onSuccess: (cardsResponse: GetCardsResponse) => {
			const response = cardsResponse || {};
			setCards(response.cards || defaultCardsContext.cards);
			setCardsSummary(response.summary || defaultCardsContext.cardsSummary);
		},
		onError: (err: any) => {
			console.log('error fetching cards', err);
		},
		options: { enabled: false },
	});

	const getTotalCashbackEarnedQuery = useRequestGetTotalCashbackEarned({
		onSuccess: (response: TotalCashbackEarned) => {
			setTotalCashbackEarned(response.totalCashbackEarned);
		},
		onError: (err: any) => {
			console.log('error fetching total cashback earned', err);
		},
		options: { enabled: false },
	});

	const getCashbackDetailsQuery = useRequestGetCashbackDetails({
		onSuccess: (response: CashbackDetails) => {
			setCashbackDetails(response);
		},
		onError: (err: any) => {
			console.log('error fetching total cashback details', err);
		},
		options: { enabled: false },
	});

	const getStatementsBillQuery = useRequestGetStatementsBill({
		onSuccess: (cardsResponse: Bill) => {
			setBill(cardsResponse);
		},
		onError: (err: any) => {
			console.log('error fetching bills', err);
		},
		options: { enabled: false },
	});

	useEffect(() => {
		setLoader('get-cards', isLoadingCards);
	}, [isLoadingCards, setLoader]);

	useEffect(() => {
		setMasterCardUuid(getMasterCardUuid(cards));
	}, [cards]);

	const CardsProviderValue = useMemo(
		(): CardsContextType => ({
			cards,
			setCards,
			cardsSummary,
			setCardsSummary,
			masterCardUuid,
			reFetchCards,
			isFetchingCards,
			isLoadingCards,
			getTotalCashbackEarnedQuery,
			totalCashbackEarned,
			getCashbackDetailsQuery,
			cashbackDetails,
			getStatementsBillQuery,
			bill,
			setBill,
		}),
		[
			cards,
			setCards,
			cardsSummary,
			setCardsSummary,
			masterCardUuid,
			reFetchCards,
			isFetchingCards,
			isLoadingCards,
			getTotalCashbackEarnedQuery,
			totalCashbackEarned,
			getCashbackDetailsQuery,
			cashbackDetails,
			getStatementsBillQuery,
			bill,
			setBill,
		]
	);

	return <CardsContext.Provider value={CardsProviderValue}>{children}</CardsContext.Provider>;
};

export default CardsContext;
