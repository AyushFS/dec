import React from 'react';
import './Textarea.scss';
import { ReactFCC } from '../../common/interface/react';

export interface TextareaProps {
	label?: string;
	id?: string;
	errorMessage?: string;
	helperText?: string;
	required?: boolean;
	prefix?: string | number | JSX.Element | JSX.Element[];
	suffix?: string | number | JSX.Element | JSX.Element[];
	testId?: string;
	name?: string;
	[key: string]: any;
}

const Textarea: ReactFCC<TextareaProps> = (props) => {
	const {
		type,
		id,
		label,
		errorMessage,
		helperText,
		required,
		className,
		prefix,
		suffix,
		testId,
		...restOfTheAttributes
	} = props;

	const inputId = id || `input_id_${Math.floor(Math.random() * 1000) + 1}`;
	const classNames = [className || '', 'form-textarea']
		.filter((val) => val)
		.join(' ')
		.trim();
	const attributes = {
		required,
		className: classNames,
		'data-testid': testId,
		...restOfTheAttributes,
	};
	const formFieldClassNames = ['form-control', errorMessage ? 'has-error' : '', helperText ? 'has-help' : '']
		.filter((val) => val)
		.join(' ')
		.trim();

	return (
		<div className={formFieldClassNames} data-testid="input-form-control">
			{label && (
				<label htmlFor={inputId} className="form-label">
					{label}
					{required && '*'}
				</label>
			)}
			<div className={prefix || suffix ? 'input-group' : undefined}>
				<textarea id={inputId} {...attributes} />
			</div>
			{errorMessage && (
				<span className="form-control__error" data-testid={`${testId}-error`}>
					{errorMessage}
				</span>
			)}
			{helperText && <span className="form-control__help">{helperText}</span>}
		</div>
	);
};

export default Textarea;
