import React from 'react';
import { ReactComponent as Eye } from '../../../../assets/images/icons/eye.svg';
import { ReactComponent as EStatement } from '../../../../assets/images/icons/transaction-lined.svg';
import { ReactComponent as Cashback } from '../../../../assets/images/icons/cashback.svg';
import { ReactComponent as Cards } from '../../../../assets/images/icons/cards.svg';
import { ReactComponent as PlusSign } from '../../../../assets/images/icons/plus.svg';
import { IconTypes } from '../../../../components/FsIcon/constants';
import i18n from '../../../../common/utilities/i18n';
import { cardModulePath } from '../../constants';

interface QuickActionConfig {
	icon: React.ReactNode;
	iconType?: IconTypes;
	title: string;
	path: string;
}

const getQuickActionList: () => QuickActionConfig[] = () => [
	{
		icon: <Eye />,
		iconType: IconTypes.svg,
		title: i18n.t('overview.quick_actions.view_card_details'),
		path: `${cardModulePath}/manage-cards?card={cardUuid}`,
	},
	{
		icon: <EStatement />,
		iconType: IconTypes.svg,
		title: i18n.t('overview.quick_actions.view_e_statements'),
		path: `${cardModulePath}/statement`,
	},
	{
		icon: <Cashback />,
		iconType: IconTypes.svg,
		title: i18n.t('overview.quick_actions.cashback_and_rewards'),
		path: `${cardModulePath}/cashback`,
	},
	{
		icon: <Cards />,
		iconType: IconTypes.svg,
		title: i18n.t('overview.quick_actions.manage_cards'),
		path: `${cardModulePath}/manage-cards`,
	},
	{
		icon: <EStatement />,
		iconType: IconTypes.svg,
		title: i18n.t('overview.quick_actions.transaction_history'),
		path: `${cardModulePath}/transactions`,
	},
	{
		icon: <PlusSign />,
		iconType: IconTypes.svg,
		title: i18n.t('overview.quick_actions.add_new_card'),
		path: `${cardModulePath}/manage-cards/add-card`,
	},
];

export default getQuickActionList;
