import { useMemo } from 'react';
import { EVENTS, VALIDATOR } from './constants';
import {
	EventToValidatorMap,
	FormErrors,
	ElementEventHandlers,
	Schema,
	ValidationSchema,
	CustomEventHandlers,
} from './types';

const getEventValidationMap: (Schema: Schema) => EventToValidatorMap = (schema: Schema) => {
	const eventToValidationMap: { [m in EVENTS]?: Array<VALIDATOR> } = {};
	const { triggerValidationOn } = schema;
	const validationToEventMap = Object.entries(triggerValidationOn);
	for (let i = 0; i < validationToEventMap.length; i++) {
		const validationToEventMapItem = validationToEventMap[i];
		const validationName = validationToEventMapItem[0] as VALIDATOR;
		const events = validationToEventMapItem[1];
		events.reduce((acc, event) => {
			acc[event] = acc[event] || [];
			acc[event]?.push(validationName);
			return acc;
		}, eventToValidationMap);
	}
	return eventToValidationMap;
};

const generateEventHandlers = <T>(
	schema: ValidationSchema<T>,
	setFormErrors: React.Dispatch<React.SetStateAction<FormErrors<T>>>,
	eventHandlers: CustomEventHandlers
): ElementEventHandlers<T> => {
	const formKeyValues = Object.entries(schema);
	let validatorCallbackFn = {};
	for (let i = 0; i < formKeyValues.length; i++) {
		const formEntry = formKeyValues[i];
		const formKey = formEntry[0] as VALIDATOR;
		const formSchema = formEntry[1] as Schema;
		const { validatorFn } = formSchema;
		const eventToValidationMap = getEventValidationMap(formSchema);
		const events = Object.keys(eventToValidationMap);
		const resultEventHandlerMap: { [m in EVENTS]?: (e: any) => void } = {};

		for (let j = 0; j < Object.keys(eventToValidationMap).length; j++) {
			const eventName = events[j] as EVENTS;
			const validationsList = eventToValidationMap[eventName];
			const validatorHandler = (e: any) => {
				const { value } = e.target;
				const failingValidationList = validationsList?.filter((validationItem: VALIDATOR) => {
					const validateFn = eventHandlers[validationItem] || validatorFn[validationItem]!;
					return !validateFn(value);
				});
				setFormErrors((prev: any) => ({ ...prev, [formKey]: failingValidationList }));
			};
			resultEventHandlerMap[eventName] = validatorHandler;
		}
		validatorCallbackFn = {
			...validatorCallbackFn,
			[formKey]: resultEventHandlerMap,
		};
	}
	return validatorCallbackFn;
};

const useFormValidationEventHandlers = <T>(
	schema: ValidationSchema<T>,
	setFormErrors: React.Dispatch<React.SetStateAction<FormErrors<T>>>,
	eventHandlers: CustomEventHandlers = {}
): ElementEventHandlers<T> =>
	useMemo(() => generateEventHandlers(schema, setFormErrors, eventHandlers), [eventHandlers, schema, setFormErrors]);
export default useFormValidationEventHandlers;
