import { EVENTS, VALIDATOR } from '../../../../../../common/hooks/useFormValidation/constants';
import { ValidationSchema } from '../../../../../../common/hooks/useFormValidation/types';
import { emailValidator, requiredValidator } from '../../../../../../common/hooks/useFormValidation/validateForm';
import { User } from '../../../../../../common/interface/user';
import i18n from '../../../../../../common/utilities/i18n';

export const getValidationSchema: () => ValidationSchema<User> = () => ({
	name: {
		errorMessage: {
			[VALIDATOR.REQUIRED]: i18n.t('manage_cards.add_card.user_details_form.name_required'),
		},
		validation: [VALIDATOR.REQUIRED],
		validatorFn: {
			[VALIDATOR.REQUIRED]: requiredValidator,
		},
		triggerValidationOn: {
			[VALIDATOR.REQUIRED]: [EVENTS.ON_BLUR],
		},
	},
	email: {
		errorMessage: {
			[VALIDATOR.REQUIRED]: i18n.t('manage_cards.add_card.user_details_form.email_required'),
			[VALIDATOR.EMAIL]: i18n.t('manage_cards.add_card.user_details_form.email_not_valid'),
		},
		validation: [VALIDATOR.REQUIRED, VALIDATOR.EMAIL],
		validatorFn: {
			[VALIDATOR.REQUIRED]: requiredValidator,
			[VALIDATOR.EMAIL]: emailValidator,
		},
		triggerValidationOn: {
			[VALIDATOR.REQUIRED]: [EVENTS.ON_BLUR],
			[VALIDATOR.EMAIL]: [EVENTS.ON_BLUR],
		},
	},
	nationality: {
		errorMessage: { [VALIDATOR.REQUIRED]: i18n.t('manage_cards.add_card.user_details_form.nationality_required') },
		validation: [VALIDATOR.REQUIRED],
		validatorFn: {
			[VALIDATOR.REQUIRED]: requiredValidator,
		},
		triggerValidationOn: {
			[VALIDATOR.REQUIRED]: [EVENTS.ON_BLUR],
		},
	},
	role: {
		errorMessage: { [VALIDATOR.REQUIRED]: i18n.t('manage_cards.add_card.user_details_form.role_required') },
		validation: [VALIDATOR.REQUIRED],
		validatorFn: {
			[VALIDATOR.REQUIRED]: requiredValidator,
		},
		triggerValidationOn: {
			[VALIDATOR.REQUIRED]: [EVENTS.ON_BLUR],
		},
	},
	mobilePhoneNumber: {
		errorMessage: { [VALIDATOR.REQUIRED]: i18n.t('manage_cards.add_card.user_details_form.mobile_number_required') },
		validation: [VALIDATOR.REQUIRED],
		validatorFn: {
			[VALIDATOR.REQUIRED]: requiredValidator,
		},
		triggerValidationOn: {
			[VALIDATOR.REQUIRED]: [EVENTS.ON_BLUR],
		},
	},
});

export default getValidationSchema;
