import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ReactFCC } from '../../../../common/interface/react';
import useAuth from '../../../Auth/useAuth';
import QuickAction from '../../components/QuickAction';
import { cardModulePath } from '../../constants';
import { CardDetails } from '../../ManageCards/interface';
import useCards from '../../UseCards';
import { sortCards } from '../../utils';
import SectionHeader from '../SectionHeader';
import getQuickActionList from './config';
import QuickActionConfig from './interface';
import styles from './QuickActions.module.scss';

interface QuickActionsProps {}

const QuickActions: ReactFCC<QuickActionsProps> = () => {
	const { cards: cardList } = useCards();
	const navigate = useNavigate();
	const { auth } = useAuth();
	const { t } = useTranslation();
	const onClick = (action: QuickActionConfig, isProcessing: boolean) => {
		if (!isProcessing) navigate(action.path);
	};
	const quickActionList = getQuickActionList();

	const sortedCards = useMemo(() => {
		const cards = cardList;
		return [
			...sortCards(cards.filter((card: CardDetails) => card?.userUuid === auth?.member_uuid)),
			...sortCards(cards.filter((card: CardDetails) => card?.userUuid !== auth?.member_uuid)),
		];
	}, [auth?.member_uuid, cardList]);
	const myCard = sortedCards[0];

	return (
		<div className={styles.QuickActions} data-testid="quick-actions-component">
			<SectionHeader title={t('overview.quick_actions.title')} />
			<div className={styles.actions}>
				{quickActionList.map((action) => {
					let isProcessing = false;
					if (action.path === `${cardModulePath}/manage-cards?card={cardUuid}`) {
						action.path = action.path.replace('{cardUuid}', myCard?.cardUuid);
						if (!myCard?.cardUuid) {
							isProcessing = true;
						}
					}
					return (
						<div key={action.title} className={styles.action}>
							<QuickAction {...action} processing={isProcessing} onClick={() => onClick(action, isProcessing)} />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default QuickActions;
