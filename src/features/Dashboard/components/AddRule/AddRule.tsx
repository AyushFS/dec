import React, { useState, useEffect, ChangeEvent } from 'react';
import LEP from '@jeanbenitez/logical-expression-parser';
import Drawer from '../../../../components/Drawer';
import Button, { ButtonColors, ButtonTypes } from '../../../../components/Button';
import {
	status_types,
	default_output_types,
	rule_execution_mode,
	rule_execution_default,
	default_condition_states,
	defaultRuleValues,
} from '../../../../common/constant/defaultValues/defaultValues';
import FsIcon from '../../../../components/FsIcon';
import styles from './AddRule.module.scss';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import InputComp from '../InputComp/InputComp';
import OutputComp from '../OutputComp/OutputComp';
import TwoBtnModal from '../TwoBtnModal/TwoBtnModal';
import UseDashboard from '../../UseDashboard';

interface AddRuleProps {
	openDrawer: boolean;
	handleToggleDrawer: () => void;
	rulesetId: string;
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const AddRule = ({ openDrawer, handleToggleDrawer, rulesetId }: AddRuleProps) => {
	const [openInput, setOpenInput] = useState(true);
	const [openModal, setOpenModal] = useState(false);
	const [isView, setIsView] = useState(false);

	const { addNewRule, selectedRule, updateRule: updateMainRule } = UseDashboard();

	const [rule, setRule] = useState(defaultRuleValues);
	const [output_types, setOutputTypesValues] = useState(default_output_types);
	const [isValidExpression, setIsValidExpression] = useState<boolean>(true);

	const checkisValidExpression = (expr: string) => {
		// @ts-ignore
		const input_names = [...Array(rule.input.length).keys()].map((i) => alphabet[i]);
		const logical_operators = ['AND', 'OR'];
		const simplified_exp: string[] | string = expr.replaceAll('OR', '');

		if (LEP.parse(simplified_exp, (t: string) => [...input_names, ...logical_operators].includes(t))) {
			const expression = expr
				.replaceAll('(', '')
				.replaceAll(')', '')
				.replaceAll('AND', '')
				.replaceAll('OR', '')
				.replaceAll(' ', '')
				.split('');

			if (JSON.stringify(expression) === JSON.stringify(input_names)) setIsValidExpression(true);
			else setIsValidExpression(false);
		} else setIsValidExpression(false);
	};

	useEffect(() => {
		if (rule.logical_expression && rule.rule_execution_mode === 'non_linear')
			checkisValidExpression(rule.logical_expression);
	}, [rule.input]);

	useEffect(() => {
		if (Object.keys(selectedRule).length !== 0) {
			setIsView(true);
			setOpenInput(true);
			setRule(selectedRule);
		} else {
			setIsView(false);
			setOpenInput(true);
			setRule(defaultRuleValues);
		}
	}, [selectedRule, openDrawer]);

	const handleRuleExecutionChange = (execution_mode: string) => {
		if (execution_mode === 'non_linear') {
			if (rule.logical_expression) checkisValidExpression(rule.logical_expression);
			setOutputTypesValues([{ value: 'single', label: 'Single Output' }]);
		} else if (rule.rule_execution_mode !== 'linear' && execution_mode === 'linear') {
			setIsValidExpression(true);
			setOutputTypesValues(default_output_types);
		}

		setRule((preV) => {
			return { ...preV, output_type: 'single', rule_execution_mode: execution_mode };
		});
	};

	const handleExpressionChange = (expr: string) => {
		setRule((preV) => {
			return { ...preV, logical_expression: expr };
		});
		checkisValidExpression(expr);
	};

	const checkIfDataComplete = () => {
		let flag: boolean = true; // details are complete

		if (rule.output_type !== 'multiple') {
			if (!rule.output.fail.value || !rule.output.pass.value) {
				setOpenInput(false);
				flag = false;
			}
			rule.input.forEach((i) => {
				if (
					(i.operator !== 'between' && i.value.length === 0) ||
					(i.operator === 'between' && (i.startValue.length === 0 || i.endValue.length === 0))
				) {
					flag = false;
					setOpenInput(true);
				}
			});
		}

		return flag;
	};

	const updateRule = (key: string, value: any) => {
		if (isView) return;
		switch (key) {
			case 'output_type':
				setOpenInput(true);
				setRule((preV) => {
					return { ...preV, [key]: value, ...default_condition_states };
				});
				break;
			case 'rule_execution_mode':
				handleRuleExecutionChange(value);
				break;
			case 'logical_expression':
				handleExpressionChange(value);
				break;
			case 'rule_name':
			case 'status':
			case 'description':
			case 'input':
			case 'output':
			case 'conditions':
				setRule((preV) => {
					return { ...preV, [key]: value };
				});
				break;

			default:
				break;
		}
	};

	const handleInputChange = (index: number, key: string, value: any) => {
		let temp = [];

		if (rule.output_type === 'single') {
			temp = [...rule.input];
			if (key === 'operator' && value === 'between')
				temp[index] = { ...temp[index], operator: 'between', startValue: '', endValue: '' };
			else if (key === 'operator')
				temp[index] = { ...temp[index], operator: value, value: '', startValue: '', endValue: '' };
			else temp[index] = { ...temp[index], [key]: value };
			updateRule('input', temp);
		} else {
			temp = [...rule.conditions];
			if (key === 'operator' && value === 'between')
				temp[index] = { ...temp[index], operator: 'between', startValue: '', endValue: '' };
			else if (key === 'operator')
				temp[index] = { ...temp[index], operator: value, value: '', startValue: '', endValue: '' };
			else if (key === 'output_type') temp[index] = { ...temp[index], [key]: value, output_value: '' };
			else temp[index] = { ...temp[index], [key]: value };
			updateRule('conditions', temp);
		}
	};

	const handleOutputChange = (value: any) => updateRule('output', { ...rule.output, ...value });

	const handleAddInput = () => {
		let temp = [];
		if (rule.output_type === 'single') {
			temp = [
				...rule.input,
				{ name: alphabet[rule.input.length], comparator: 'static', factor: '', operator: '', value: '' },
			];
			updateRule('input', temp);
		} else {
			temp = [
				...rule.conditions,
				{
					name: alphabet[rule.conditions.length],
					comparator: 'static',
					factor: '',
					operator: '',
					value: '',
					startValue: '',
					endValue: '',
					output_type: '',
					output_value: '',
				},
			];
			updateRule('conditions', temp);
		}
	};

	const handleDeleteInput = (name: string) => {
		let temp = [];
		if (rule.output_type === 'single') {
			temp = rule.input.filter((i: { name: string }) => i.name !== name);
			for (let index = 0; index < temp.length; index++) temp[index].name = alphabet[index];
			updateRule('input', temp);
		} else {
			temp = rule.conditions.filter((i: { name: string }) => i.name !== name);
			for (let index = 0; index < temp.length; index++) temp[index].name = alphabet[index];
			updateRule('conditions', temp);
		}
	};

	const handleConfirmLeave = () => {
		if (!isView && rule.rule_id.length !== 0) setOpenModal(true);
		else {
			setOpenModal(false);
			handleToggleDrawer();
		}
	};

	const handleDiscard = () => {
		setOpenModal(false);
		handleToggleDrawer();
	};

	const handleAddRule = () => {
		if (checkIfDataComplete()) {
			const temp = { ...rule, rule_id: `RS-20221227-1234567${Math.floor(Math.random() * (100 - 1 + 1) + 1)}` };
			handleToggleDrawer();
			addNewRule(temp, rulesetId);
			setRule(defaultRuleValues);
		}
	};

	const handleCheckForUpdate = () => {
		// if single output_type & output missings
		if (rule.output_type !== 'multiple' && (!rule.output.fail.value || !rule.output.pass.value)) {
			setOpenInput(false);
		}
		// trigger update state & close drawer
		else if (checkIfDataComplete()) {
			updateMainRule('', rule, rulesetId, selectedRule.rule_id, true);
			handleToggleDrawer();
		}
	};

	return (
		<>
			{openDrawer && (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						if (isView) setIsView(false);
						else if (selectedRule.rule_id) handleCheckForUpdate();
						else handleAddRule();
					}}
				>
					<Drawer
						isDrawerOpen={openDrawer}
						hideDrawer={() => {}}
						right
						width={(window.innerWidth - 200) / 2}
						header={
							<div className={styles.AddRuleHeader}>
								<h6>Add Rule</h6>
								<Button link onClick={handleConfirmLeave} testId="close-button">
									<FsIcon size={24}>cross</FsIcon>
								</Button>
							</div>
						}
						content={
							<div className={styles.outerContainer}>
								<div className={styles.container}>
									<div className={styles.row}>
										<div className={styles.col}>
											<Input label="Rule ID" disabled value={rule.rule_id} isView={isView} />
										</div>
										<div className={styles.col}>
											<Input
												label="Rule Name	"
												placeholder="Insert rule name"
												value={rule.rule_name}
												onChange={(e: ChangeEvent<HTMLInputElement>) => updateRule('rule_name', e.target.value)}
												isView={isView}
											/>
										</div>
										<div className={styles.col}>
											<Select
												label="Rule Execution Mode"
												options={rule_execution_mode}
												defaultOption={rule_execution_default}
												selected={rule.rule_execution_mode}
												value={rule.rule_execution_mode}
												onChange={(e: string) => updateRule('rule_execution_mode', e)}
												isView={isView}
												required
											/>
										</div>
										<div className={styles.col}>
											<Input
												label="Rule Status"
												radiobtns={status_types}
												selected={rule.status}
												type="radio"
												onChange={(e: ChangeEvent<HTMLInputElement>) => updateRule('status', e.target.value)}
												isView={isView}
											/>
										</div>

										<Input
											label="Description"
											placeholder="Insert description"
											value={rule.description}
											onChange={(e: ChangeEvent<HTMLInputElement>) => updateRule('description', e.target.value)}
											isView={isView}
										/>
										<div className={styles.col}>
											<Select
												label="Output Type"
												selected={rule.output_type}
												value={rule.output_type}
												options={output_types}
												onChange={(e: string) => updateRule('output_type', e)}
												isView={isView}
												required
											/>
										</div>
										{rule.rule_execution_mode === 'non_linear' && (
											<div className={styles.col}>
												<Input
													label="Logical Expression"
													placeholder="eg: (A AND (B OR C))"
													value={rule.logical_expression}
													onChange={(e: ChangeEvent<HTMLInputElement>) =>
														updateRule('logical_expression', e.target.value.toUpperCase())
													}
													isView={isView}
													required
													errorMessage={!isValidExpression ? 'Invalid Expression or Missing Inputs!' : ''}
												/>
											</div>
										)}
									</div>
								</div>
								{(rule.rule_execution_mode === 'non_linear' && rule.logical_expression.length) ||
								rule.rule_execution_mode === 'linear' ? (
									<>
										<div className={styles.switchBtnContainer}>
											{rule.output_type === 'single' ? (
												<>
													<div
														className={`${openInput ? styles.selected : ''} ${styles.switchBtn}`}
														onClick={() => setOpenInput(true)}
													>
														Input
													</div>
													<div
														className={`${!openInput ? styles.selected : ''} ${styles.switchBtn} `}
														onClick={() => setOpenInput(false)}
													>
														Output
													</div>
												</>
											) : (
												<div className={styles.conditionsTxt}>Conditions</div>
											)}
										</div>
										<div className={styles.inoutsection}>
											{rule.output_type === 'single' ? (
												<div>
													{openInput ? (
														<>
															{rule.input &&
																rule.input.map((cond, index) => (
																	<InputComp
																		key={alphabet[index]}
																		condition={cond}
																		index={index}
																		handleOnChange={handleInputChange}
																		onDelete={handleDeleteInput}
																		isView={isView}
																	/>
																))}
															<div>
																{!isView && (
																	<Button color={ButtonColors.secondary} onClick={handleAddInput}>
																		Add condition
																	</Button>
																)}
															</div>
														</>
													) : (
														<OutputComp output={rule.output} isView={isView} onChange={handleOutputChange} />
													)}
												</div>
											) : (
												<div>
													{rule.conditions &&
														rule.conditions.map((cond, index) => (
															<InputComp
																key={alphabet[index]}
																condition={cond}
																index={index}
																handleOnChange={handleInputChange}
																onDelete={handleDeleteInput}
																showOutput
																isView={isView}
															/>
														))}
													<div>
														{!isView && (
															<Button color={ButtonColors.secondary} onClick={handleAddInput}>
																Add condition
															</Button>
														)}
													</div>
												</div>
											)}
										</div>
									</>
								) : (
									''
								)}
							</div>
						}
						footer={
							<div className={styles.actionBtn}>
								{isView && (
									<div>
										<Button color={ButtonColors.secondary} onClick={handleToggleDrawer}>
											Delete Entry
										</Button>
									</div>
								)}
								<Button color={ButtonColors.secondary} onClick={handleConfirmLeave}>
									Cancel
								</Button>
								{isView ? (
									<Button color={ButtonColors.secondary} type={ButtonTypes.submit}>
										Edit Details
									</Button>
								) : (
									<Button color={ButtonColors.primary} type={ButtonTypes.submit} disabled={!isValidExpression}>
										{selectedRule.rule_id ? 'Update Rule' : 'Add Rule'}
									</Button>
								)}
							</div>
						}
					/>
				</form>
			)}

			<TwoBtnModal
				openModal={openModal}
				title="Are you sure you want to leave?"
				msg="Your edits will not be saved if you continue"
				firstBtnText="Cancel"
				secondBtnText="Discard Changes"
				handleModalToggle={() => setOpenModal((preV) => !preV)}
				handleFirstBtn={() => setOpenModal(false)}
				handleSecondBtn={handleDiscard}
			/>
		</>
	);
};

export default AddRule;
