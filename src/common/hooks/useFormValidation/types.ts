import { EVENTS, VALIDATOR } from './constants';

export interface Schema {
	errorMessage: { [key in VALIDATOR]?: string };
	validation: Array<VALIDATOR>;
	validatorFn: { [n in VALIDATOR]?: (value: string) => boolean };
	triggerValidationOn: { [o in VALIDATOR]?: Array<EVENTS> };
}

export type CustomEventHandlers = { [n in VALIDATOR]?: (value: string) => boolean };

export type ValidationSchema<T> = {
	[k in keyof T]?: Schema;
};

export type useFormValidationEvenHandlersType<T> = (
	schema: ValidationSchema<T>,
	setFormErrors: any
) => { [k in keyof T]?: { [m in EVENTS]?: (e: any) => void } };

export type FormErrors<T> = { [key in keyof T]?: Array<VALIDATOR> };

export type EventToValidatorMap = {
	[m in EVENTS]?: Array<VALIDATOR>;
};

export type ElementEventHandlers<T> = { [k in keyof T]?: { [m in EVENTS]?: (e: any) => void } };
