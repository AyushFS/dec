import React from 'react';
import { USER_PERMISSIONS } from '../../../../common/constant/enum/GeneralEnum';
import { ReactFCC } from '../../../../common/interface/react';
import useAuth from '../../../Auth/useAuth';
import CopyCardNumberils from '../CardDetailsAndActions/CopyCardNumber/CopyCardNumber';
import ShowCardDetails from '../CardDetailsAndActions/ShowCardDetails/ShowCardDetails';
import ToggleLockCard from '../CardDetailsAndActions/ToggleLockCard/ToggleLockCard';
import { CardDetails } from '../interface';
import styles from './CardActions.module.scss';

interface CardActionsProps {
	card: CardDetails;
}

const CardActions: ReactFCC<CardActionsProps> = (props) => {
	const { card } = props;
	const { permissions } = useAuth();
	return (
		<div className={styles.CardActions} data-testid="card-actions-component">
			{!card.isLocked && permissions.includes(USER_PERMISSIONS.CARDS_INFO_VIEW) && (
				<>
					<ShowCardDetails card={card} />
					<CopyCardNumberils card={card} />
				</>
			)}
			{permissions.includes(USER_PERMISSIONS.CARD_LOCK_STATUS_UPDATE) && <ToggleLockCard card={card} />}
		</div>
	);
};

export default CardActions;
