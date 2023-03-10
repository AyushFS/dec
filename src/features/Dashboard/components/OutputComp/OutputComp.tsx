import React, { ChangeEvent } from 'react';
import { OutputStructure } from '../../../../common/interface/ruleset';
import { output_options, bool_options, custom_options } from '../../../../common/constant/defaultValues/defaultValues';
import Card from '../../../../components/Card';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import styles from './OutputComp.module.scss';

interface ContentProps {
	title: string;
	data: any;
	update: (key: string, value: string, oldobj?: any, type?: string) => void;
	isMulti?: boolean;
	isView: boolean;
}

interface OutputCompProps {
	output: OutputStructure;
	onChange: (value: any) => void;
	isView: boolean;
}

const string_values = ['string', 'number', 'json'];
// const select_values = ['string', 'custom'];

export const Content = ({ title, data, update, isMulti, isView }: ContentProps) => {
	return (
		<>
			{title && (
				<div className={`${styles.head} ${isMulti ? styles.morePad : ''}`}>
					{isMulti ? 'Output:' : ''} {title}
				</div>
			)}
			<div className={styles.inputContainer}>
				<div className={styles.row}>
					<div className={styles.col}>
						<Select
							selected={data.output_type}
							value={data.output_type}
							label="Output Type"
							options={output_options}
							onChange={(e: string) => {
								update('output_type', e, data, title);
							}}
							isView={isView}
							required
						/>
					</div>
				</div>
				<div className={styles.row}>
					{/* for those whose valse is of type string */}
					{string_values.includes(data.output_type) && (
						<Input
							value={isMulti ? data.output_value : data.value}
							label="Value"
							placeholder="Insert value"
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								isMulti ? update('output_value', e.target.value) : update('value', e.target.value, data, title)
							}
							isView={isView}
							required
						/>
					)}
					{data.output_type === 'boolean' && (
						<Select
							selected={isMulti ? data.output_value : data.value}
							value={isMulti ? data.output_value : data.value}
							label="Value"
							options={bool_options}
							isView={isView}
							onChange={(e: string) => (isMulti ? update('output_value', e) : update('value', e, data, title))}
							required
						/>
					)}
					{data.output_type === 'custom' && (
						<Select
							selected={isMulti ? data.output_value : data.value}
							value={isMulti ? data.output_value : data.value}
							label="Value"
							options={custom_options}
							isView={isView}
							onChange={(e: string) => (isMulti ? update('output_value', e) : update('value', e, data, title))}
							required
						/>
					)}
				</div>
			</div>
		</>
	);
};

const OutputComp = ({ output, onChange, isView }: OutputCompProps) => {
	const handleUpdate = (key: string, value: string, oldobj?: any, type?: any) => {
		let temp = { ...oldobj, [key]: value };
		if (key === 'output_type') temp = { ...temp, value: '' };
		temp = { [type]: temp };
		onChange(temp);
	};
	return (
		<>
			{Object.keys(output).map((d: string) => {
				return (
					<div className={styles.mainContainer} key={d}>
						<Card contentPadding={0}>
							<Content
								title={d}
								data={d === 'pass' ? output.pass : output.fail}
								update={handleUpdate}
								isView={isView}
							/>
						</Card>
					</div>
				);
			})}
		</>
	);
};

export default OutputComp;
