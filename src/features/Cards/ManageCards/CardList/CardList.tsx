import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReactFCC } from '../../../../common/interface/react';
import useAuth from '../../../Auth/useAuth';
import useGlobalState from '../../../GlobalState/useGlobalState';
import CardListItem from './CardListItem/CardListItem';
import { CardDetails } from '../interface';
import useManageCards from '../UseManageCards';
import useCards from '../../UseCards';
import { sortCards } from '../../utils';

interface CardListProps {
	onCardClick: (card: CardDetails) => void;
}

const CardList: ReactFCC<CardListProps> = ({ onCardClick }) => {
	const { auth } = useAuth();
	const [searchParams] = useSearchParams();
	const { loaders } = useGlobalState();
	const { currentCard, setCurrentCard } = useManageCards();
	const { cards: cardList } = useCards();

	useEffect(() => {
		const cardUuid = currentCard?.cardUuid || searchParams.get('card');
		if (cardUuid) {
			const card = cardList.find((c) => c.cardUuid === cardUuid);
			if (card) {
				setCurrentCard(card);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cardList]);

	const containerProps = {
		className: 'card-list-component',
		'data-testid': 'card-list-component',
	};

	const sortedCards = useMemo(() => {
		const cards = cardList || [];
		return [
			...sortCards(cards.filter((card: CardDetails) => card?.userUuid === auth?.member_uuid)),
			...sortCards(cards.filter((card: CardDetails) => card?.userUuid !== auth?.member_uuid)),
		];
	}, [auth?.member_uuid, cardList]);

	if (loaders['get-cards']) return <div {...containerProps}>Loading...</div>;

	return (
		<div {...containerProps}>
			{sortedCards.map((card: CardDetails) => {
				return <CardListItem key={card.cardUuid} card={card} onCardClick={onCardClick} />;
			})}
		</div>
	);
};

export default CardList;
