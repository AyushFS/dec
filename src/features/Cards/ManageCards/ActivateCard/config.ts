import i18n from '../../../../common/utilities/i18n';
import CARD_ACTIVATION_STEPS from './constants';

const stepwiseConfiguration = () => ({
	[CARD_ACTIVATION_STEPS.DIRECTOR_SELECTION]: {
		title: i18n.t('manage_cards.activate_card.director_selection.page_title'),
	},
	[CARD_ACTIVATION_STEPS.ACKNOWLEDGEMENT]: {
		title: i18n.t('manage_cards.activate_card.acknowledgement.page_title'),
	},
});

export default stepwiseConfiguration;
