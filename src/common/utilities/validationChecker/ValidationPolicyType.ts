export interface ValidationPolicyType {
	minChars?: PolicyTypeValue;
	maxChars?: PolicyTypeValue;
	minValue?: PolicyTypeValue;
	maxValue?: PolicyTypeValue;
	isValidEmail?: PolicyTypeBoolean;
	isNumberOnly?: PolicyTypeBoolean;
	isAlphabetOnly?: PolicyTypeBoolean;
	minUpperCaseCharsCount?: PolicyTypeValue;
	minLowerCaseCharsCount?: PolicyTypeValue;
	minNumericCharsCount?: PolicyTypeValue;
}

export interface PolicyTypeValue {
	value: any;
	errorMsg: string;
}

export interface PolicyTypeBoolean {
	errorMsg: string;
}

export enum PolicyTypeNames {
	minChars = 'minChars',
	maxChars = 'maxChars',
	minValue = 'minValue',
	maxValue = 'maxValue',
	isValidEmail = 'isValidEmail',
	isNumberOnly = 'isNumberOnly',
	isAlphabetOnly = 'isAlphabetOnly',
	minUpperCaseCharsCount = 'minUpperCaseCharsCount',
	minLowerCaseCharsCount = 'minLowerCaseCharsCount',
	minNumericCharsCount = 'minNumericCharsCount',
}

export type ValidationResult = {
	success: boolean;
	errorMsg: string;
	policyTypeName?: PolicyTypeNames;
};

export interface ValidationType {
	phone: ValidationPolicyType;
	email: ValidationPolicyType;
	name: ValidationPolicyType;
	password: ValidationPolicyType;
	newPassword: ValidationPolicyType;
	otp: ValidationPolicyType;
}

export enum NewUserForm {
	NAME = 'name',
	PHONE = 'phone',
	EMAIL = 'email',
	NATIONALITY = 'nationality',
}

type NewUserKeys = NewUserForm;

export type NewUserValidationType = {
	[key in NewUserKeys]: ValidationPolicyType;
};

export enum SpecifyLimitForm {
	LIMIT = 'limit',
	SPEND_PURPOSE = 'spendPurposeUuid',
}

type SpecifyLimitKeys = SpecifyLimitForm;

export type SpecifyLimitValidationType = {
	[key in SpecifyLimitKeys]: ValidationPolicyType;
};
