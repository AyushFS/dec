import { EVENTS, VALIDATOR } from '../../../../../../common/hooks/useFormValidation/constants';
import { ValidationSchema } from '../../../../../../common/hooks/useFormValidation/types';
import { requiredValidator } from '../../../../../../common/hooks/useFormValidation/validateForm';
import i18n from '../../../../../../common/utilities/i18n';
import { SpecifyLimitEntity } from './interface';

export const spendLimitValidator = (currentLimit?: string) => {
	const limit = parseFloat(currentLimit || '') || Infinity;
	return (inputLimit: string) => parseFloat(inputLimit) <= limit;
};

export const getValidationSchema: () => ValidationSchema<SpecifyLimitEntity> = () => ({
	spendLimit: {
		errorMessage: {
			[VALIDATOR.REQUIRED]: i18n.t('manage_cards.add_card.specify_limit_page.spend_limit_required'),
			[VALIDATOR.RANGE]: i18n.t('manage_cards.add_card.specify_limit_page.spend_limit_range'),
		},
		validation: [VALIDATOR.REQUIRED, VALIDATOR.RANGE],
		validatorFn: {
			[VALIDATOR.REQUIRED]: requiredValidator,
		},
		triggerValidationOn: {
			[VALIDATOR.REQUIRED]: [EVENTS.ON_BLUR],
			[VALIDATOR.RANGE]: [EVENTS.ON_INPUT],
		},
	},
	spendPurpose: {
		errorMessage: { [VALIDATOR.REQUIRED]: i18n.t('manage_cards.add_card.specify_limit_page.spend_purpose_required') },
		validation: [VALIDATOR.REQUIRED],
		validatorFn: {
			[VALIDATOR.REQUIRED]: requiredValidator,
		},
		triggerValidationOn: {
			[VALIDATOR.REQUIRED]: [EVENTS.ON_BLUR],
		},
	},
});
