import i18n from '../../../../common/utilities/i18n';
import MANAGE_CARD_LIMIT_STEPS from './constants';

const stepwiseConfiguration = () => ({
	[MANAGE_CARD_LIMIT_STEPS.CONSENT]: {
		title: i18n.t('manage_cards.manage_limit.understand_card_spending_modal.title'),
	},
	[MANAGE_CARD_LIMIT_STEPS.UPDATE_LIMIT]: {
		title: i18n.t('manage_cards.manage_limit.manage_card_limit.title'),
	},
});

export default stepwiseConfiguration;
