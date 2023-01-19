import React, { createContext, useMemo, useState, useCallback, Dispatch, SetStateAction } from 'react';
import { ReactFCC } from '../../common/interface/react';
import { Ruleset, Rule } from '../../common/interface/ruleset';

interface DashboardContextType {
	rulesets: Array<Ruleset>;
	setRulesets: Dispatch<SetStateAction<Ruleset[]>>;
	selectedRuleset: Ruleset;
	setSelectedRuleset: Dispatch<SetStateAction<Ruleset>>;
	addNewRuleSet: (ruleset: Ruleset) => void;
	addNewRule: (rule: Rule, ruleset_id: string) => void;
	deleteRuleset: (ruleset_id: string) => void;
	deleteRule: (ruleset_id: string, rule_id: string) => void;
	updateRuleset: (key: string, value: string | Ruleset | Rule[], ruleset_id: string, all?: boolean) => void;
	updateRule: (key: string, value: string | Rule, ruleset_id: string, rule_id: string, all?: boolean) => void;
	selectedRule: any;
	setSelectedRule: Dispatch<SetStateAction<any>>;
}

const defaultDashboardContext = {
	rulesets: [
		{
			ruleset_name: 'SG Bolt Ruleset 2022-12',
			country: 'SG',
			status: 'active',
			description: 'Ruleset for processing basic details for SG Bolt',
			id: 'SG202501-1234',
			version: '1.03.01',
			creator: 'Alwin T.',
			created_on: '05-12-2022',
			updated_on: '05-12-2022',
			rules: [
				{
					rule_id: 'RS-20221229-1234567899',
					rule_name: 'SG Bolt 01',
					output_type: 'single',
					status: 'active',
					description: 'For processing data',
					rule_execution_mode: 'linear',
					logical_expression: '',
					input: [
						{
							name: 'A',
							comparator: 'static',
							factor: 'age',
							operator: 'gt',
							value: '24',
							startValue: '',
							endValue: '',
						},
						{
							name: 'B',
							comparator: 'dynamic',
							factor: 'balance',
							operator: 'gt',
							value: 'income',
							startValue: '',
							endValue: '',
						},
					],
					output: {
						pass: { output_type: 'string', value: 'Yup' },
						fail: { output_type: 'string', value: 'Try Again!' },
					},
					conditions: [
						{
							name: 'A',
							comparator: 'static',
							factor: '',
							operator: '',
							value: '',
							startValue: '',
							endValue: '',
							output_type: 'boolean',
							output_value: '',
						},
					],
				},
				{
					rule_id: 'RS-20221229-123456789',
					rule_name: 'SG Bolt 02',
					output_type: 'single',
					status: 'active',
					description: 'For processing data',
					rule_execution_mode: 'linear',
					logical_expression: '',
					input: [
						{
							name: 'A',
							comparator: 'static',
							factor: 'age',
							operator: 'gt',
							value: '24',
							startValue: '',
							endValue: '',
						},
						{
							name: 'B',
							comparator: 'dynamic',
							factor: 'balance',
							operator: 'gt',
							value: 'age',
							startValue: '',
							endValue: '',
						},
					],
					output: {
						pass: { output_type: 'string', value: 'Yup' },
						fail: { output_type: 'string', value: 'Try Again!' },
					},
					conditions: [
						{
							name: 'A',
							comparator: 'static',
							factor: '',
							operator: '',
							value: '',
							startValue: '',
							endValue: '',
							output_type: 'boolean',
							output_value: '',
						},
					],
				},
				{
					rule_id: 'RS-20221229-1234567898',
					rule_name: 'SG Bolt 03',
					output_type: 'single',
					status: 'inactive',
					description: 'For processing data',
					rule_execution_mode: 'linear',
					logical_expression: '',
					input: [
						{
							name: 'A',
							comparator: 'static',
							factor: 'age',
							operator: 'gt',
							value: '24',
							startValue: '',
							endValue: '',
						},
						{
							name: 'B',
							comparator: 'dynamic',
							factor: 'balance',
							operator: 'gt',
							value: 'income',
							startValue: '',
							endValue: '',
						},
					],
					output: {
						pass: { output_type: 'string', value: 'Yup' },
						fail: { output_type: 'string', value: 'Try Again!' },
					},
					conditions: [
						{
							name: 'A',
							comparator: 'static',
							factor: '',
							operator: '',
							value: '',
							startValue: '',
							endValue: '',
							output_type: 'boolean',
							output_value: '',
						},
					],
				},
				{
					rule_id: 'RS-20221229-123456783',
					rule_name: 'SG Bolt 04',
					output_type: 'single',
					status: 'active',
					description: 'For processing data',
					rule_execution_mode: 'linear',
					logical_expression: '',
					input: [
						{
							name: 'A',
							comparator: 'static',
							factor: 'age',
							operator: 'gt',
							value: '24',
							startValue: '',
							endValue: '',
						},
						{
							name: 'B',
							comparator: 'dynamic',
							factor: 'balance',
							operator: 'gt',
							value: 'age',
							startValue: '',
							endValue: '',
						},
					],
					output: {
						pass: { output_type: 'string', value: 'Yup' },
						fail: { output_type: 'string', value: 'Try Again!' },
					},
					conditions: [
						{
							name: 'A',
							comparator: 'static',
							factor: '',
							operator: '',
							value: '',
							startValue: '',
							endValue: '',
							output_type: 'boolean',
							output_value: '',
						},
					],
				},
			],
		},
	],
	setRulesets: () => {},
	selectedRuleset: {} as Ruleset,
	setSelectedRuleset: () => {},
	addNewRuleSet: () => {},
	addNewRule: () => {},
	deleteRuleset: () => {},
	deleteRule: () => {},
	updateRuleset: () => {},
	updateRule: () => {},
	selectedRule: {} as Rule,
	setSelectedRule: () => {},
};

const DashboardContext = createContext<DashboardContextType>(defaultDashboardContext);

interface DashboardProviderProps {}

export const DashboardProvider: ReactFCC<DashboardProviderProps> = ({ children }) => {
	const [rulesets, setRulesets] = useState<Ruleset[]>(defaultDashboardContext.rulesets);
	const [selectedRuleset, setSelectedRuleset] = useState<Ruleset>(defaultDashboardContext.selectedRuleset);
	const [selectedRule, setSelectedRule] = useState<Rule>(defaultDashboardContext.selectedRule);

	const addNewRuleSet = useCallback((ruleset: Ruleset) => {
		setRulesets((preV: any) => [...preV, ruleset]);
	}, []);

	const deleteRuleset = useCallback(
		(ruleset_id: string) => {
			const temp = rulesets.filter((ruleset: Ruleset) => ruleset.id !== ruleset_id);
			setRulesets(temp);
		},
		[rulesets]
	);

	const updateRuleset = useCallback(
		(key: string, value: any, ruleset_id: string, all: boolean = false) => {
			let rulesetIndex = 0;
			for (let index = 0; index < rulesets.length; index++) {
				if (rulesets[index].id === ruleset_id) rulesetIndex = index;
			}
			const updatedRulesets = [...rulesets];
			if (all) {
				updatedRulesets[rulesetIndex] = { ...value };
			} else updatedRulesets[rulesetIndex] = { ...rulesets[rulesetIndex], [key]: value };
			setRulesets(updatedRulesets);
		},
		[rulesets]
	);

	const addNewRule = useCallback(
		(rule: Rule, ruleset_id: string) => {
			let rulesetIndex = 0;
			for (let index = 0; index < rulesets.length; index++) {
				if (rulesets[index].id === ruleset_id) rulesetIndex = index;
			}
			const currentRuleSet = { ...rulesets[rulesetIndex] };
			currentRuleSet.rules.push(rule);
			const updatedRulesets = [...rulesets];
			updatedRulesets[rulesetIndex] = currentRuleSet;
			setRulesets(updatedRulesets);
		},
		[rulesets]
	);

	const deleteRule = useCallback(
		(ruleset_id: string, rule_id: string) => {
			let rulesetIndex = 0;
			for (let index = 0; index < rulesets.length; index++) {
				if (rulesets[index].id === ruleset_id) rulesetIndex = index;
			}
			const currentRuleSet = { ...rulesets[rulesetIndex] };

			const temp = currentRuleSet.rules.filter((rule: Rule) => rule.rule_id !== rule_id);
			const updatedRulesets = [...rulesets];
			updatedRulesets[rulesetIndex] = { ...currentRuleSet, rules: temp };
			setRulesets(updatedRulesets);
			setSelectedRuleset({ ...currentRuleSet, rules: temp });
		},
		[rulesets]
	);

	const updateRule = useCallback(
		(key: string, value: any, ruleset_id: string, rule_id: string, all: boolean = false) => {
			let rulesetIndex = 0;
			let ruleIndex = 0;
			for (let index = 0; index < rulesets.length; index++) {
				if (rulesets[index].id === ruleset_id) rulesetIndex = index;
			}
			const currentRuleSet = { ...rulesets[rulesetIndex] };

			for (let index = 0; index < currentRuleSet.rules.length; index++) {
				if (currentRuleSet.rules[index].rule_id === rule_id) ruleIndex = index;
			}

			const temp = [...currentRuleSet.rules];
			// @ts-ignore
			if (!all) temp[ruleIndex][key] = value;
			else temp[ruleIndex] = value;
			const updatedRulesets = [...rulesets];
			updatedRulesets[rulesetIndex] = { ...currentRuleSet, rules: temp };
			setRulesets(updatedRulesets);
			setSelectedRuleset({ ...currentRuleSet, rules: temp });
		},
		[rulesets]
	);

	const DashboardProviderValue = useMemo(
		(): DashboardContextType => ({
			rulesets,
			setRulesets,
			selectedRuleset,
			setSelectedRuleset,
			addNewRuleSet,
			addNewRule,
			deleteRuleset,
			deleteRule,
			updateRuleset,
			updateRule,
			selectedRule,
			setSelectedRule,
		}),
		[
			rulesets,
			setRulesets,
			selectedRuleset,
			setSelectedRuleset,
			addNewRuleSet,
			addNewRule,
			deleteRuleset,
			deleteRule,
			updateRuleset,
			updateRule,
			selectedRule,
			setSelectedRule,
		]
	);

	return <DashboardContext.Provider value={DashboardProviderValue}>{children}</DashboardContext.Provider>;
};

export default DashboardContext;
