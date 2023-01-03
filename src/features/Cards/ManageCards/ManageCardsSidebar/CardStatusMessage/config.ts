import { CARD_STATUS } from '../../../../../common/constant/enum/GeneralEnum';
import { CardStatusMessageConfig, CardStatusMessageConfigs } from './types';

const cardProvisioningConfig: CardStatusMessageConfig = {
	title: 'manage_cards.card_details.card_status.pending_card_provision_and_invited_user.title',
	body: 'manage_cards.card_details.card_status.pending_card_provision_and_invited_user.body',
	button: {
		text: 'manage_cards.card_details.card_status.pending_card_provision_and_invited_user.chat_with_us',
	},
};

const cardStatusMessageConfig: CardStatusMessageConfigs = {
	[CARD_STATUS.PENDING_DIRECTOR]: {
		title: 'manage_cards.card_details.card_status.pending_director.title',
		body: 'manage_cards.card_details.card_status.pending_director.body',
		button: {
			text: 'manage_cards.card_details.card_status.pending_director.check_status',
		},
	},
	[CARD_STATUS.PENDING_CARD_PROVISION]: cardProvisioningConfig,
	[CARD_STATUS.PENDING_INVITED_USER]: cardProvisioningConfig,
};

export default cardStatusMessageConfig;
