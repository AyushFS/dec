import {
	checkIsAlphabetOnly,
	checkIsEmailValid,
	checkIsNumberOnly,
	checkMaxValue,
	checkMinNumericCharsCount,
	checkMinValue,
} from './ValidationChecker';
import { ValidationPolicy } from './ValidationPolicy';

describe('ValidationChecker', () => {
	describe('checkMinNumericCharsCount', () => {
		it('should not return error if minimum numeric characters is 0', () => {
			const value = 'testing';
			const result = checkMinNumericCharsCount(value, { value: 0, errorMsg: 'some_error' });
			expect(result).toStrictEqual({
				success: true,
				errorMsg: '',
			});
		});
		it('should not return error if the string has same as minimum numeric characters', () => {
			const value = 'testing123';
			const result = checkMinNumericCharsCount(value, { value: 3, errorMsg: 'some_error' });
			expect(result).toStrictEqual({
				success: true,
				errorMsg: '',
			});
		});
		it('should not return error if the string has more than minimum numeric characters', () => {
			const value = 'testing12345';
			const result = checkMinNumericCharsCount(value, { value: 3, errorMsg: 'some_error' });
			expect(result).toStrictEqual({
				success: true,
				errorMsg: '',
			});
		});

		it('should return error if the string has less than minimum numeric characters', () => {
			const value = 'testing123';
			const result = checkMinNumericCharsCount(value, { value: 4, errorMsg: 'some_error' });
			expect(result).toStrictEqual({
				success: false,
				errorMsg: 'some_error',
				policyTypeName: 'minNumericCharsCount',
			});
		});
	});

	describe('checkMinValue', () => {
		it('should return error if the value is less than minimum value', () => {
			const value = 1;
			const result = checkMinValue(value, { value: 2, errorMsg: 'some_error' });
			expect(result).toStrictEqual({
				success: false,
				errorMsg: 'some_error',
			});
		});
		it('should not return error if the value is equal to minimum value', () => {
			const value = 2;
			const result = checkMinValue(value, { value: 2, errorMsg: 'some_error' });
			expect(result).toStrictEqual({
				success: true,
				errorMsg: '',
			});
		});
		it('should not return error if the value is more than minimum value', () => {
			const value = 3;
			const result = checkMinValue(value, { value: 2, errorMsg: 'some_error' });
			expect(result).toStrictEqual({
				success: true,
				errorMsg: '',
			});
		});
	});

	describe('checkMaxValue', () => {
		it('should return error if the value is more than maximum value', () => {
			const value = 3;
			const result = checkMaxValue(value, { value: 2, errorMsg: 'some_error' });
			expect(result).toStrictEqual({
				success: false,
				errorMsg: 'some_error',
			});
		});
		it('should not return error if the value is equal to maximum value', () => {
			const value = 2;
			const result = checkMaxValue(value, { value: 2, errorMsg: 'some_error' });
			expect(result).toStrictEqual({
				success: true,
				errorMsg: '',
			});
		});
		it('should not return error if the value is less than maximum value', () => {
			const value = 1;
			const result = checkMaxValue(value, { value: 2, errorMsg: 'some_error' });
			expect(result).toStrictEqual({
				success: true,
				errorMsg: '',
			});
		});
	});

	describe('checkIsEmailValid', () => {
		it('should return error if the email is empty', () => {
			const value = '';
			const result = checkIsEmailValid(value, { errorMsg: 'some_error' });
			expect(result).toStrictEqual({
				success: false,
				errorMsg: 'some_error',
			});
		});
		it('should return error if the email is not valid', () => {
			const value = 'test';
			const result = checkIsEmailValid(value, { errorMsg: 'some_error' });
			expect(result).toStrictEqual({
				success: false,
				errorMsg: 'some_error',
			});
		});
		it('should not return error if the email is valid', () => {
			const value = 'abc@xyz.com';
			const result = checkIsEmailValid(value, { errorMsg: 'some_error' });
			expect(result).toStrictEqual({
				success: true,
				errorMsg: '',
			});
		});
		it('should not return error if the email is valid with subdomain', () => {
			const value = 'abc@xyz.something.com';
			const result = checkIsEmailValid(value, { errorMsg: 'some_error' });
			expect(result).toStrictEqual({
				success: true,
				errorMsg: '',
			});
		});
	});

	describe('checkIsNumberOnly', () => {
		it('should return error if the value is not a number', () => {
			const value = 'abc';
			const result = checkIsNumberOnly(value, { errorMsg: 'some_error' });
			expect(result).toStrictEqual({
				success: false,
				errorMsg: 'some_error',
			});
		});
		it('should not return error if the value is a number', () => {
			const value = '123';
			const result = checkIsNumberOnly(value, { errorMsg: 'some_error' });
			expect(result).toStrictEqual({
				success: true,
				errorMsg: '',
			});
		});
	});

	describe('checkIsAlphabetOnly', () => {
		it('should return error if the value is not an alphabet', () => {
			const value = '123';
			const result = checkIsAlphabetOnly(value, { errorMsg: 'some_error' });
			expect(result).toStrictEqual({
				success: false,
				errorMsg: 'some_error',
			});
		});
		it('should return error if the value is mix of alphabet and numbers', () => {
			const value = 'abc123';
			const result = checkIsAlphabetOnly(value, { errorMsg: 'some_error' });
			expect(result).toStrictEqual({
				success: false,
				errorMsg: 'some_error',
			});
		});
		it('should return error if the value is mix of alphabet and special characters', () => {
			const value = 'abc._#$';
			const result = checkIsAlphabetOnly(value, { errorMsg: 'some_error' });
			expect(result).toStrictEqual({
				success: false,
				errorMsg: 'some_error',
			});
		});
		it('should not return error if the value is an alphabet', () => {
			const value = 'abc';
			const result = checkIsAlphabetOnly(value, { errorMsg: 'some_error' });
			expect(result).toStrictEqual({
				success: true,
				errorMsg: '',
			});
		});
	});
});
