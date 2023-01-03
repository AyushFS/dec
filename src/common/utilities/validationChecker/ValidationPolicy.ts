// import {translate} from '~app/services/i18n.service';
import {
	NewUserValidationType,
	SpecifyLimitValidationType,
	ValidationPolicyType,
	ValidationType,
} from './ValidationPolicyType';

const translate = (str: string) => str;

const validationPolicyPhone: ValidationPolicyType = {
	minChars: {
		value: 8,
		errorMsg: translate('The mobile number format should be 8 digits'),
	},
	maxChars: {
		value: 8,
		errorMsg: translate('The mobile number format should be 8 digits'),
	},
};

export const NewUserValidationPolicy: NewUserValidationType | any = {
	name: {
		minChars: {
			value: 1,
			errorMsg: translate('Name must not be empty.'),
		},
		isAlphabetOnly: {
			errorMsg: translate('Must consist of alphabet only.'),
		},
	},
	// Not using validation policy for phone as validation is done in component
	phone: {},
	email: {
		minChars: {
			value: 1,
			errorMsg: translate('error_messages.email_must_not_be_empty'),
		},
		isValidEmail: {
			errorMsg: translate('error_messages.email_is_not_valid'),
		},
	},
	nationality: {
		minChars: {
			value: 1,
			errorMsg: translate('Nationality must not empty.'),
		},
	},
};

const validationPolicyNewPassword: ValidationPolicyType = {
	minChars: {
		value: 8,
		errorMsg: translate('The mobile number format should be 8 digits'),
	},
	maxChars: {
		value: 50,
		errorMsg: translate('The mobile number format should be 8 digits'),
	},
	minLowerCaseCharsCount: { value: 1, errorMsg: '' },
	minUpperCaseCharsCount: { value: 1, errorMsg: '' },
	minNumericCharsCount: { value: 1, errorMsg: '' },
};

const validationPolicyEmail: ValidationPolicyType = {
	minChars: { value: 1, errorMsg: translate('error_messages.email_must_not_be_empty') },
	isValidEmail: { errorMsg: translate('error_messages.email_is_not_valid') },
};

const passwordValidationPolicy: ValidationPolicyType = {
	minChars: {
		value: 1,
		errorMsg: translate('error_messages.password_must_not_be_empty'),
	},
	maxChars: { value: 50, errorMsg: '' },
};

const otpValidationPolicy: ValidationPolicyType = {
	minChars: {
		value: 6,
		errorMsg: translate('error_messages.6_digit_otp_is_required'),
	},
	maxChars: {
		value: 6,
		errorMsg: translate('error_messages.6_digit_otp_is_required'),
	},
};

export const ValidationPolicy: ValidationType = {
	phone: validationPolicyPhone,
	email: validationPolicyEmail,
	newPassword: validationPolicyNewPassword,
	name: {},
	password: passwordValidationPolicy,
	otp: otpValidationPolicy,
};

export const SpecifyLimitValidationPolicy: SpecifyLimitValidationType | any = {
	limit: {
		minChars: {
			value: 1,
			errorMsg: translate('Limit must be specified'),
		},
		isNumberOnly: {
			errorMsg: translate('Must consist of numbers only.'),
		},
		minValue: {
			value: 1,
			errorMsg: translate('Limit must be more than 0'),
		},
	},
};
