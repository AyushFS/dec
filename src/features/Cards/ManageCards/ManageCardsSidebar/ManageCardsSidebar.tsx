import React, { useCallback } from 'react';
import { ReactFCC } from '../../../../common/interface/react';
import { CARD_STATUS, USER_PERMISSIONS } from '../../../../common/constant/enum/GeneralEnum';
import useAuth from '../../../Auth/useAuth';
import CardDetailsAndActions from '../CardDetailsAndActions';
import { CardDetails } from '../interface';
import RecentTransactions from './RecentTransactions';
import AvailableBalance from './AvailableBalance';
import styles from './ManageCardsSidebar.module.scss';
import ActivateCardBox from '../ActivateCardBox';
import CardStatusMessage from './CardStatusMessage';
import { AllowedInfoCardStatus } from './CardStatusMessage/types';

interface ManageCardsSidebarProps {
	card: CardDetails;
	toggleActivateCard?: () => void;
	toggleManageCardLimit?: () => void;
}

const ManageCardsSidebar: ReactFCC<ManageCardsSidebarProps> = (props) => {
	const { card, toggleActivateCard, toggleManageCardLimit } = props;
	const { permissions } = useAuth();
	const isCardActive = card.cardStatus === CARD_STATUS.ACTIVATED;
	const isCardPendingForActivation = card.cardStatus === CARD_STATUS.PENDING_USER;

	const onActivateCardClick = useCallback(() => {
		if (toggleActivateCard) toggleActivateCard();
	}, [toggleActivateCard]);

	const onManageCardLimitClick = useCallback(() => {
		if (toggleManageCardLimit) toggleManageCardLimit();
	}, [toggleManageCardLimit]);

	return (
		<div className={styles.ManageCardsSidebar} data-testid="manage-cards-sidebar-component">
			<div className={styles.devider} />
			<CardDetailsAndActions card={card} />
			{isCardActive && (
				<>
					{permissions.includes(USER_PERMISSIONS.CARDS_SUMMARY_VIEW) && (
						<>
							<div className={styles.devider} />
							<AvailableBalance card={card} onManageCardLimitClick={onManageCardLimitClick} />
						</>
					)}
					{permissions.includes(USER_PERMISSIONS.TRANSACTIONS_VIEW) && (
						<>
							<div className={styles.devider} />
							<RecentTransactions card={card} />
						</>
					)}
				</>
			)}
			{isCardPendingForActivation && <ActivateCardBox onClick={onActivateCardClick} />}
			{!isCardPendingForActivation && !isCardActive && (
				<CardStatusMessage cardStatus={card.cardStatus as AllowedInfoCardStatus} />
			)}
		</div>
	);
};

export default ManageCardsSidebar;
