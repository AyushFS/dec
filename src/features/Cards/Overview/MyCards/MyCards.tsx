import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ReactFCC } from '../../../../common/interface/react';
import useAuth from '../../../Auth/useAuth';
import CreditCard from '../../components/CreditCard/CreditCard';
import { cardModulePath } from '../../constants';
import { CardDetails } from '../../ManageCards/interface';
import useCards from '../../UseCards';
import { getLast4Digits, getNameOnCard, getUserRole, sortCards } from '../../utils';
import SectionHeader from '../SectionHeader';
import styles from './MyCards.module.scss';

interface MyCardsProps {}

const MyCards: ReactFCC<MyCardsProps> = () => {
	const { cards: cardList, reFetchCards, isLoadingCards } = useCards();
	const navigate = useNavigate();
	const { auth } = useAuth();
	const { t } = useTranslation();

	const sortedCards = useMemo(() => {
		const cards = cardList;
		return [
			...sortCards(cards.filter((card: CardDetails) => card?.userUuid === auth?.member_uuid)),
			...sortCards(cards.filter((card: CardDetails) => card?.userUuid !== auth?.member_uuid)),
		];
	}, [auth?.member_uuid, cardList]);
	const myCard = sortedCards[0];
	const hasMoreThanOneCard = sortedCards.length > 1;

	const onViewAllCardsClick = () => {
		navigate(`${cardModulePath}/manage-cards`);
	};

	useEffect(() => {
		reFetchCards();
	}, [reFetchCards]);

	return (
		<div className={styles.myCards} data-testid="my-cards-component">
			<SectionHeader
				title={
					<>
						{t('overview.my_cards.title')}{' '}
						{hasMoreThanOneCard && <span data-testid="card-count">({sortedCards.length})</span>}
					</>
				}
				linkText={t('overview.my_cards.view_all_cards')}
				onLinkClick={onViewAllCardsClick}
			/>
			<div className={styles.myCard}>
				{isLoadingCards && <div className={styles.loading}>{t('common.loading')}</div>}
				{myCard && (
					<>
						<div className={styles.card}>
							<CreditCard card={myCard} />
						</div>
						<div className={styles.name}>
							{myCard.nameOnCard && getNameOnCard(myCard.nameOnCard)}{' '}
							{myCard.cardNumber && <span>(.... {getLast4Digits(myCard.cardNumber)})</span>}
						</div>
						<div className={styles.role}>{t(getUserRole(myCard.cardType))}</div>
					</>
				)}
			</div>
		</div>
	);
};

export default MyCards;
