import React from 'react';
import Card from '../../../../components/Card';
import styles from './InputComp.module.scss';
import svgIcons from '../../../../components/FsIcon/FsIconSvg';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import { Content } from '../OutputComp/OutputComp';

interface InputCompProps {
	condition: any;
	handleOnChange: (index: number, key: string, value: any) => void;
	index: number;
	onDelete: (name: string) => void;
	showOutput?: boolean;
	isView: boolean;
}

const factor_options = [
	{ value: 'age', label: 'Age' },
	{ value: 'balance', label: 'Balance' },
	{ value: 'income', label: 'Income' },
];

const operator_options = [
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

const array_values = ['not_in', 'in'];

const InputComp = ({ condition, handleOnChange, onDelete, index, showOutput, isView }: InputCompProps) => {
	const handleOutputChange = (key: string, value: string) => {
		handleOnChange(index, key, value);
	};

	return (
		<div className={styles.mainContainer}>
			<Card contentPadding={0}>
				<div className={styles.inputContainer}>
					<div className={styles.head}>
						<div>Condition: {condition.name}</div>
						{!isView && <div onClick={() => onDelete(condition.name)}>{svgIcons.Delete}</div>}
					</div>
					<div className={styles.row}>
						<div className={styles.col}>
							<Select
								label="Comparator"
								selected={condition.comparator}
								value={condition.comparator}
								defaultOption={{ value: 'static', label: 'Static Comparator' }}
								options={[{ value: 'dynamic', label: 'Dynamic Comparator' }]}
								onChange={(e: string) => handleOnChange(index, 'comparator', e)}
								isView={isView}
								required
							/>
						</div>
						<div className={styles.col}>
							<Select
								label="Factor"
								selected={condition.factor}
								value={condition.factor}
								defaultOption={{ value: '', label: 'Choose factor' }}
								options={factor_options}
								onChange={(e: string) => handleOnChange(index, 'factor', e)}
								isView={isView}
								required
							/>
						</div>
						<div className={styles.bottomContainer}>
							{condition.factor && (
								<div className={styles.valueSection}>
									<Select
										label="Operator"
										selected={condition.operator}
										value={condition.operator}
										defaultOption={{ value: '', label: 'Pick operator' }}
										options={operator_options}
										onChange={(e: string) => handleOnChange(index, 'operator', e)}
										isView={isView}
										required
									/>
								</div>
							)}
							{condition.operator && condition.operator !== 'between' && (
								<div className={`${styles.valueSection}} ${styles.fullFlex}`}>
									{condition.comparator === 'static' ? (
										<Input
											value={condition.value}
											label={array_values.includes(condition.operator) ? 'Array' : 'Value'}
											placeholder={array_values.includes(condition.operator) ? 'eg: 1, 2, 3, 4, 5, 6' : 'Insert value'}
											onChange={(e: any) => handleOnChange(index, 'value', e.target.value)}
											isView={isView}
											required
										/>
									) : (
										<Select
											label={array_values.includes(condition.operator) ? 'Array' : 'Value'}
											value={condition.value}
											selected={condition.value}
											defaultOption={{ value: '', label: 'Choose Value' }}
											options={factor_options}
											onChange={(e: string) => handleOnChange(index, 'value', e)}
											isView={isView}
											required
										/>
									)}
								</div>
							)}

							{condition.operator && condition.operator === 'between' && condition.comparator === 'static' && (
								<>
									<div className={styles.valueSection}>
										<Input
											value={condition.startValue}
											label="Start Value"
											placeholder="Insert value"
											isView={isView}
											onChange={(e: any) => handleOnChange(index, 'startValue', e.target.value)}
											required
										/>
									</div>
									<div className={styles.valueSection}>
										<Input
											value={condition.endValue}
											label="End Value"
											placeholder="Insert value"
											isView={isView}
											onChange={(e: any) => handleOnChange(index, 'endValue', e.target.value)}
											required
										/>
									</div>
								</>
							)}

							{condition.operator && condition.operator === 'between' && condition.comparator === 'dynamic' && (
								<>
									<div className={styles.valueSection}>
										<Select
											label="Start Value"
											value={condition.startValue}
											selected={condition.startValue}
											defaultOption={{ value: '', label: 'Choose Value' }}
											options={factor_options}
											onChange={(e: string) => handleOnChange(index, 'startValue', e)}
											isView={isView}
											required
										/>
									</div>
									<div className={styles.valueSection}>
										<Select
											label="End Value"
											value={condition.endValue}
											selected={condition.endValue}
											defaultOption={{ value: '', label: 'Choose Value' }}
											options={factor_options}
											onChange={(e: string) => handleOnChange(index, 'endValue', e)}
											isView={isView}
											required
										/>
									</div>
								</>
							)}
						</div>
					</div>
					{showOutput && (
						<>
							<hr />
							<Content title={condition.name} data={condition} update={handleOutputChange} isMulti isView={isView} />
						</>
					)}
				</div>
			</Card>
		</div>
	);
};

export default InputComp;
