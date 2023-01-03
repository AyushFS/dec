import {
	PolicyTypeBoolean,
	PolicyTypeNames,
	PolicyTypeValue,
	ValidationPolicyType,
	ValidationResult,
} from './ValidationPolicyType';

export function checkMinChars(val: string, minChars: PolicyTypeValue): ValidationResult {
	if (val?.length >= minChars.value) {
		return { success: true, errorMsg: '' };
	}

	return {
		success: false,
		errorMsg: minChars.errorMsg,
		policyTypeName: PolicyTypeNames.minChars,
	};
}

export function checkMaxChars(val: string, maxChars: PolicyTypeValue): ValidationResult {
	if (val?.length <= maxChars.value) {
		return { success: true, errorMsg: '' };
	}

	return {
		success: false,
		errorMsg: maxChars.errorMsg,
		policyTypeName: PolicyTypeNames.maxChars,
	};
}

/** eg: Policy: min lowercase count : 2
 *     #1 Input : "abcd1"  Output: true
 *     #2 Input : "ABCd" or "ABCD"   Output: false
 */
export function checkMinLowerCaseCharsCount(val: string, minLowerCaseCharsCount: PolicyTypeValue): ValidationResult {
	// eslint-disable-next-line
	const pattern = '^(.*?[a-z]){' + minLowerCaseCharsCount.value + ',}.*$';
	const regex = new RegExp(pattern);
	if (regex.test(val)) {
		return { success: true, errorMsg: '' };
	}

	return {
		success: false,
		errorMsg: minLowerCaseCharsCount.errorMsg,
		policyTypeName: PolicyTypeNames.minLowerCaseCharsCount,
	};
}

/** eg: Policy: min uppercase count : 2
 *     #1 Input : "aAbCd1"  Output: true
 *     #2 Input : "abc1d" or "abcDe"   Output: false
 */
export function checkMinUpperCaseCharsCount(val: string, minUpperCaseCharsCount: PolicyTypeValue): ValidationResult {
	// eslint-disable-next-line
	const pattern = '^(.*?[A-Z]){' + minUpperCaseCharsCount.value + ',}.*$';
	const regex = new RegExp(pattern);
	if (regex.test(val)) {
		return { success: true, errorMsg: '' };
	}

	return {
		success: false,
		errorMsg: minUpperCaseCharsCount.errorMsg,
		policyTypeName: PolicyTypeNames.minUpperCaseCharsCount,
	};
}

/** eg: Policy: min numeric count : 2
 *     #1 Input : "ab3cd1"  Output: true
 *     #2 Input : "abc1d"   Output: false
 */
export function checkMinNumericCharsCount(val: string, minNumericCharsCount: PolicyTypeValue): ValidationResult {
	// eslint-disable-next-line
	const pattern = '(\\D*\\d){' + minNumericCharsCount.value + ',}'; // (\D*\d){2,}
	const regex = new RegExp(pattern);
	if (regex.test(val)) {
		return { success: true, errorMsg: '' };
	}

	return {
		success: false,
		errorMsg: minNumericCharsCount.errorMsg,
		policyTypeName: PolicyTypeNames.minNumericCharsCount,
	};
}

export function checkMinValue(val: string | number, minValue: PolicyTypeValue): ValidationResult {
	// eslint-disable-next-line
	const value = typeof val === 'undefined' ? null : typeof val === 'string' ? parseFloat(val) : val;
	if (value && value >= minValue.value) {
		return { success: true, errorMsg: '' };
	}

	return { success: false, errorMsg: minValue.errorMsg };
}

export function checkMaxValue(val: string | number, maxValue: PolicyTypeValue): ValidationResult {
	// eslint-disable-next-line
	const value = typeof val === 'undefined' ? null : typeof val === 'string' ? parseFloat(val) : val;
	if (value && value <= maxValue.value) {
		return { success: true, errorMsg: '' };
	}

	return { success: false, errorMsg: maxValue.errorMsg };
}

export function checkIsEmailValid(val: string, isValidEmail: PolicyTypeBoolean): ValidationResult {
	// Pattern from https://stackoverflow.com/a/46181
	const pattern =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const regex = new RegExp(pattern);
	if (regex.test(val)) {
		return { success: true, errorMsg: '' };
	}
	return { success: false, errorMsg: isValidEmail.errorMsg };
}

export function checkIsNumberOnly(val: string, isNumberOnly: PolicyTypeBoolean): ValidationResult {
	// Pattern from https://stackoverflow.com/a/19715367
	const pattern = /^[0-9]*$/;
	const regex = new RegExp(pattern);
	if (regex.test(val)) {
		return { success: true, errorMsg: '' };
	}
	return { success: false, errorMsg: isNumberOnly.errorMsg };
}

export function checkIsAlphabetOnly(val: string, isAlphabetOnly: PolicyTypeBoolean): ValidationResult {
	const pattern = /^[A-Za-z ]+$/;
	const regex = new RegExp(pattern);
	if (regex.test(val)) {
		return { success: true, errorMsg: '' };
	}
	return { success: false, errorMsg: isAlphabetOnly.errorMsg };
}

export const validationCheck = (value: string, policy: ValidationPolicyType): Array<ValidationResult> => {
	const checksToBePerformed = Object.keys(policy);
	const resultArr = [];

	for (let i = 0; i < checksToBePerformed.length; i++) {
		const checkName: string = checksToBePerformed[i];
		let result;

		// eslint-disable-next-line
		switch (checkName) {
			case PolicyTypeNames.minChars:
				result = checkMinChars(value, policy[checkName] as PolicyTypeValue);
				if (!result.success) {
					resultArr.push(result);
				}
				break;
			case PolicyTypeNames.maxChars:
				result = checkMaxChars(value, policy[checkName] as PolicyTypeValue);
				if (!result.success) {
					resultArr.push(result);
				}
				break;
			case PolicyTypeNames.minLowerCaseCharsCount:
				result = checkMinLowerCaseCharsCount(value, policy[checkName] as PolicyTypeValue);
				if (!result.success) {
					resultArr.push(result);
				}
				break;
			case PolicyTypeNames.minUpperCaseCharsCount:
				result = checkMinUpperCaseCharsCount(value, policy[checkName] as PolicyTypeValue);
				if (!result.success) {
					resultArr.push(result);
				}
				break;
			case PolicyTypeNames.minNumericCharsCount:
				result = checkMinNumericCharsCount(value, policy[checkName] as PolicyTypeValue);
				if (!result.success) {
					resultArr.push(result);
				}
				break;
			case PolicyTypeNames.minValue:
				result = checkMinValue(value, policy[checkName] as PolicyTypeValue);
				if (!result.success) {
					resultArr.push(result);
				}

				break;
			case PolicyTypeNames.maxValue:
				result = checkMaxValue(value, policy[checkName] as PolicyTypeValue);
				if (!result.success) {
					resultArr.push(result);
				}

				break;
			case PolicyTypeNames.isValidEmail:
				result = checkIsEmailValid(value, policy[checkName] as PolicyTypeValue);
				if (!result.success) {
					resultArr.push(result);
				}

				break;
			case PolicyTypeNames.isNumberOnly:
				result = checkIsNumberOnly(value, policy[checkName] as PolicyTypeValue);
				if (!result.success) {
					resultArr.push(result);
				}

				break;
			case PolicyTypeNames.isAlphabetOnly:
				result = checkIsAlphabetOnly(value, policy[checkName] as PolicyTypeValue);
				if (!result.success) {
					resultArr.push(result);
				}

				break;
		}
	}

	if (resultArr.length > 0) {
		return resultArr;
	}

	return [{ success: true, errorMsg: '' }];
};

export default validationCheck;
