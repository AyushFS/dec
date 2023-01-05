/* eslint-disable no-nested-ternary */
import React from 'react';
import { ReactFCC } from '../../common/interface/react';
import { InputTypes } from './constants';
import './Input.scss';

interface InputProps {
	type?: InputTypes | string;
	id?: string;
	label?: string;
	errorMessage?: string;
	helperText?: string;
	required?: boolean;
	prefix?: string | number | JSX.Element | JSX.Element[];
	suffix?: string | number | JSX.Element | JSX.Element[];
	testId?: string;
	name?: string;
	[key: string]: any;
}

const Input: ReactFCC<InputProps> = (props) => {
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
		isView,
		...restOfTheAttributes
	} = props;
	const inputId = id || `input_id_${Math.floor(Math.random() * 1000) + 1}`;
	const classNames = [className || '', 'form-input']
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
				<label
					htmlFor={inputId}
					className={`form-label ${restOfTheAttributes.disabled ? 'disableLabel' : ''} ${isView ? 'biggerlabel' : ''}`}
				>
					{label}
					{required && '*'}
				</label>
			)}
			{isView ? (
				type !== 'radio' ? (
					<div className="biggerText">{restOfTheAttributes.value.length === 0 ? '-' : restOfTheAttributes.value}</div>
				) : (
					<div className="biggerText">
						{restOfTheAttributes.selected.length === 0 ? '-' : restOfTheAttributes.selected}
					</div>
				)
			) : (
				<div className={prefix || suffix ? 'input-group' : undefined}>
					{prefix && <span className="input-group__prefix">{prefix}</span>}
					{type !== 'radio' ? (
						<input type={type || InputTypes.text} id={inputId} {...attributes} />
					) : (
						<div className="inputRadioContainer">
							{restOfTheAttributes.radiobtns.length > 0 &&
								restOfTheAttributes.radiobtns.map((btn: { value: string; label: string }) => (
									<div className="inputRadio" key={btn.value}>
										<input
											type="radio"
											id={btn.value}
											name="radio"
											checked={restOfTheAttributes.selected === btn.value}
											value={btn.value}
											{...attributes}
										/>
										<label htmlFor={btn.value}>{btn.label}</label>
									</div>
								))}
						</div>
					)}
					{suffix && <span className="input-group__suffix">{suffix}</span>}
				</div>
			)}

			{errorMessage && (
				<span className="form-control__error" data-testid={`${testId}-error`}>
					{errorMessage}
				</span>
			)}
			{helperText && <span className="form-control__help">{helperText}</span>}
		</div>
	);
};

Input.defaultProps = {
	errorMessage: '',
};

export default Input;
