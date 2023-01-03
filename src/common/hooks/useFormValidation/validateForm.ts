import { VALIDATOR } from './constants';
import { CustomEventHandlers } from './types';

export const requiredValidator = (value: string) => !!value.trim();
export const emailValidator = (email: string) => /\S+@\S+\.\S+/.test(email);

/* TODO: return error message with field itself so that, one doesn't have to look up for the error message from schema */
export const validateForm = (
	schema: any,
	formData: { [k: string]: any },
	customEventHandlers: CustomEventHandlers = {}
) => {
	const result: any = {};
	const formKeyValues = Object.entries(formData);

	for (let i = 0; i < formKeyValues.length; i++) {
		const formEntry = formKeyValues[i];
		const fieldValidationSchema = schema[formEntry[0]];
		if (fieldValidationSchema) {
			const validations = fieldValidationSchema.validation;
			if (validations) {
				validations.forEach((validationName: VALIDATOR) => {
					const validateField =
						customEventHandlers[validationName] || fieldValidationSchema.validatorFn[validationName];
					if (!validateField(formEntry[1])) {
						result[formEntry[0]] = result[formEntry[0]] || [];
						result[formEntry[0]].push(validationName);
					}
				});
			}
		}
	}

	return { result, isValid: !Object.keys(result).length };
};
