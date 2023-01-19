export interface InputStructure {
	name: string;
	comparator: string;
	factor: string;
	operator: string;
	value?: string;
	startValue?: string;
	endValue?: string;
}

export interface OutputValue {
	output_type: string;
	value: string;
}

export interface OutputStructure {
	pass: OutputValue;
	fail: OutputValue;
}

export interface ConditionStructure {
	name: string;
	comparator: string;
	factor: string;
	operator: string;
	value?: string;
	startValue?: string;
	endValue?: string;
	output_type: string;
	output_value: string;
}

export interface Rule {
	rule_id: string;
	rule_name: string;
	output_type: string;
	status: string;
	description: string;
	rule_execution_mode: string;
	logical_expression?: string;
	input?: InputStructure[];
	output?: OutputStructure;
	conditions?: ConditionStructure[];
}

export interface Ruleset {
	ruleset_name: string;
	country: string;
	status: string;
	description: string;
	id: string;
	version: string;
	creator: string;
	created_on: string;
	updated_on: string;
	rules: Rule[];
}
