import {
	validationCheck,
	checkMaxChars,
	checkMinChars,
	checkMinLowerCaseCharsCount,
	checkMinUpperCaseCharsCount,
} from './ValidationChecker';
import { ValidationPolicy } from './ValidationPolicy';

describe('ValidationChecker', () => {
	describe('Email', () => {
		it('should not return an error when the email is valid', () => {
			const email = 'abc@xyz.com';
			const result = validationCheck(email, ValidationPolicy.email);
			expect(result).toStrictEqual([{ errorMsg: '', success: true }]);
		});
		it('should return error if the email is empty', () => {
			const value = '';
			const result = validationCheck(value, ValidationPolicy.email);
			expect(result).toStrictEqual([
				{
					errorMsg: 'error_messages.email_must_not_be_empty',
					policyTypeName: 'minChars',
					success: false,
				},
				{ errorMsg: 'error_messages.email_is_not_valid', success: false },
			]);
		});
		it('should return error if the email is not valid', () => {
			const value = 'test';
			const result = validationCheck(value, ValidationPolicy.email);
			expect(result).toStrictEqual([{ errorMsg: 'error_messages.email_is_not_valid', success: false }]);
		});
	});

	describe('Password', () => {
		it('should not return error if the password is valid', () => {
			const value = 'password123';
			const result = validationCheck(value, ValidationPolicy.password);
			expect(result).toStrictEqual([
				{
					errorMsg: '',
					success: true,
				},
			]);
		});

		it('should return error if the password is empty', () => {
			const value = '';
			const result = validationCheck(value, ValidationPolicy.password);
			expect(result).toStrictEqual([
				{
					errorMsg: 'error_messages.password_must_not_be_empty',
					policyTypeName: 'minChars',
					success: false,
				},
			]);
		});

		it('should return error if the password is longer than 50 characters', () => {
			const value = '123456789012345678901234567890123456789012345678901';
			const result = validationCheck(value, ValidationPolicy.password);
			expect(result).toStrictEqual([
				{
					errorMsg: '',
					policyTypeName: 'maxChars',
					success: false,
				},
			]);
		});
	});

	describe('phone', () => {
		it('should not return error if phone is 8 characters', () => {
			const value = '12345678';
			const result = validationCheck(value, ValidationPolicy.phone);
			expect(result).toStrictEqual([
				{
					errorMsg: '',
					success: true,
				},
			]);
		});
		it('should return error if phone is empty', () => {
			const value = '';
			const result = validationCheck(value, ValidationPolicy.phone);
			expect(result).toStrictEqual([
				{
					errorMsg: 'The mobile number format should be 8 digits',
					policyTypeName: 'minChars',
					success: false,
				},
			]);
		});
		it('should return error if phone is less than 8 characters', () => {
			const value = '1234567';
			const result = validationCheck(value, ValidationPolicy.phone);
			expect(result).toStrictEqual([
				{
					errorMsg: 'The mobile number format should be 8 digits',
					policyTypeName: 'minChars',
					success: false,
				},
			]);
		});
		it('should return error if phone is more than 8 characters', () => {
			const value = '123456789';
			const result = validationCheck(value, ValidationPolicy.phone);
			expect(result).toStrictEqual([
				{
					errorMsg: 'The mobile number format should be 8 digits',
					policyTypeName: 'maxChars',
					success: false,
				},
			]);
		});
	});

	describe('otp', () => {
		it('should not return error if otp is 6 characters', () => {
			const value = '123456';
			const result = validationCheck(value, ValidationPolicy.otp);
			expect(result).toStrictEqual([
				{
					errorMsg: '',
					success: true,
				},
			]);
		});
		it('should return error if otp is empty', () => {
			const value = '';
			const result = validationCheck(value, ValidationPolicy.otp);
			expect(result).toStrictEqual([
				{
					errorMsg: 'error_messages.6_digit_otp_is_required',
					policyTypeName: 'minChars',
					success: false,
				},
			]);
		});
		it('should return error if otp is less than 6 characters', () => {
			const value = '12345';
			const result = validationCheck(value, ValidationPolicy.otp);
			expect(result).toStrictEqual([
				{
					errorMsg: 'error_messages.6_digit_otp_is_required',
					policyTypeName: 'minChars',
					success: false,
				},
			]);
		});
		it('should return error if otp is more than 6 characters', () => {
			const value = '1234567';
			const result = validationCheck(value, ValidationPolicy.otp);
			expect(result).toStrictEqual([
				{
					errorMsg: 'error_messages.6_digit_otp_is_required',
					policyTypeName: 'maxChars',
					success: false,
				},
			]);
		});
	});
});
