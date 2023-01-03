import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageWithSidebar from '../components/PageWithSidebar/PageWithSidebar';
import useCards from '../UseCards';
import { cardModulePath } from '../constants';
import useManageCards from './UseManageCards';
import CardList from './CardList/CardList';
import ManageCardsHeader from './ManageCardsHeader/ManageCardsHeader';
import ManageCardsSidebar from './ManageCardsSidebar/ManageCardsSidebar';
import AddCardBox from './AddCardBox/AddCardBox';
import AddCard from './AddCard';
import ActivateCard from './ActivateCard/ActivateCard';
import ManageCardLimit from './ManageCardLimit';
import './ManageCards.scss';
import { CardDetails } from './interface';

function ManageCards() {
	const { t } = useTranslation();
	const { currentCard, setCurrentCard } = useManageCards();
	const { cardsSummary, reFetchCards } = useCards();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [searchParams, setSearchParams] = useSearchParams();
	const location = useLocation();
	const navigate = useNavigate();
	const setCardDetails = useCallback(
		(card: CardDetails) => {
			if (!card.cardUuid || card.cardUuid === currentCard?.cardUuid) {
				setCurrentCard({} as CardDetails);
				setSearchParams({});
			} else {
				setCurrentCard(card);
				setSearchParams({ card: card.cardUuid });
			}
		},
		[currentCard, setCurrentCard, setSearchParams]
	);

	/* Activate card flow */
	const [showActivateCard, setShowActivateCard] = useState(false);
	const toggleActivateCard = useCallback(() => {
		setShowActivateCard((prev) => !prev);
	}, []);
	const onAddCardClick = useCallback(() => {
		navigate('./add-card');
	}, [navigate]);

	const setCardDetailsToNull = useCallback(() => setCardDetails({} as CardDetails), [setCardDetails]);

	/* Manage card limit */
	const [showManageCardLimit, setShowManageCardLimit] = useState(false);
	const enableManageCardLimit = useCallback(() => {
		setShowManageCardLimit(true);
	}, []);
	const onCloseManageCardLimit = useCallback(() => {
		reFetchCards();
		setShowManageCardLimit((prev) => !prev);
	}, [reFetchCards]);

	const hasCardData = Object.keys(currentCard).length > 0;
	const currentCardSpendPurposeUuid = currentCard?.spendPurposes?.length > 0 ? currentCard.spendPurposes[0].uuid : '';
	const isAddCardPath = location.pathname.includes('/add-card');

	useEffect(() => {
		reFetchCards();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="manage-cards-component" data-testid="manage-cards-component">
			<PageWithSidebar
				header={<ManageCardsHeader onAddCardClick={onAddCardClick} />}
				sidebarContent={
					hasCardData && (
						<ManageCardsSidebar
							key={currentCard.cardUuid}
							card={currentCard}
							toggleActivateCard={toggleActivateCard}
							toggleManageCardLimit={enableManageCardLimit}
						/>
					)
				}
				sidebarLabel={t('manage_cards.card_details.card_details')}
				onClose={setCardDetailsToNull}
				onOverlayClick={setCardDetailsToNull}
			>
				<CardList onCardClick={setCardDetails} />
				<AddCardBox />
			</PageWithSidebar>
			{isAddCardPath && <AddCard redirectURL={`${cardModulePath}/manage-cards`} />}
			{showActivateCard && currentCard && (
				<ActivateCard cardUuid={currentCard.cardUuid} onCloseFlow={toggleActivateCard} />
			)}
			{showManageCardLimit && (
				<ManageCardLimit
					onCloseFlow={onCloseManageCardLimit}
					maxCardLimit={cardsSummary.totalLimit}
					currentLimit={currentCard.totalLimit}
					userUuid={currentCard.userUuid}
					cardUuid={currentCard.cardUuid}
					cardSpendPurposeUuid={currentCardSpendPurposeUuid}
				/>
			)}
		</div>
	);
}

export default ManageCards;
