// select input type default values/options
export const status_types = [
	{ value: 'active', label: 'Active' },
	{ value: 'inactive', label: 'Inactive' },
];

export const default_output_types = [
	{ value: 'single', label: 'Single Output' },
	{ value: 'multiple', label: 'Multiple Output' },
];

export const rule_execution_mode = [
	{ value: 'non_linear', label: 'Non-Linear Execution' },
	{ value: 'linear', label: 'Linear Execution' },
];

export const factor_options = [
	{ value: 'age', label: 'Age' },
	{ value: 'balance', label: 'Balance' },
	{ value: 'income', label: 'Income' },
];

export const operator_options = [
	{ value: 'equal', label: 'Equals' },
	{ value: 'not_equal', label: 'Not equals' },
	{ value: 'gt', label: 'Greator than' },
	{ value: 'gtorequal', label: 'Greator than or equal to' },
	{ value: 'lt', label: 'Less than' },
	{ value: 'ltorequal', label: 'Less than or equal to' },
	{ value: 'in', label: 'In' },
	{ value: 'not_in', label: 'Not in' },
	{ value: 'like', label: 'Like' },
	{ value: 'between', label: 'Between' },
];

// comparator apart from default
export const comparator_options = [{ value: 'dynamic', label: 'Dynamic Comparator' }];

export const output_options = [
	{ value: 'boolean', label: 'Boolean' },
	{ value: 'string', label: 'String' },
	{ value: 'number', label: 'Number' },
	{ value: 'json', label: 'JSON' },
	{ value: 'custom', label: 'Custom value based on formula' },
];

export const bool_options = [
	{ value: '1', label: 'Pass' },
	{ value: '0', label: 'Fail' },
];

export const custom_options = [{ value: '', label: '' }];

// Default values for rule
export const rule_execution_default = { value: '', label: 'Insert Rule Execution Mode' };

export const default_condition_states = {
	input: [{ name: 'A', comparator: 'static', factor: '', operator: '', value: '', startValue: '', endValue: '' }],
	output: { pass: { output_type: 'string', value: '' }, fail: { output_type: 'string', value: '' } },
	conditions: [
		{
			name: 'A',
			comparator: 'static',
			factor: '',
			operator: '',
			value: '',
			startValue: '',
			endValue: '',
			output_type: 'string',
			output_value: '',
		},
	],
};

export const defaultRuleValues = {
	rule_id: '',
	rule_name: '',
	output_type: 'single',
	status: 'active',
	description: '',
	rule_execution_mode: '',
	logical_expression: '',
	input: [{ name: 'A', comparator: 'static', factor: '', operator: '', value: '', startValue: '', endValue: '' }],
	output: { pass: { output_type: 'string', value: '' }, fail: { output_type: 'string', value: '' } },
	conditions: [
		{
			name: 'A',
			comparator: 'static',
			factor: '',
			operator: '',
			value: '',
			startValue: '',
			endValue: '',
			output_type: 'string',
			output_value: '',
		},
	],
};

export const default_comparator = { value: 'static', label: 'Static Comparator' };

export const default_factor = { value: '', label: 'Choose factor' };

export const default_operator = { value: '', label: 'Pick operator' };

export const default_value = { value: '', label: 'Choose Value' };
