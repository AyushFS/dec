import React, { ChangeEvent, FC, memo, useCallback, useEffect, useState } from 'react';
import i18n from '../../common/utilities/i18n';
import { OPERATOR_NAMES } from '../../common/constant/enum/GeneralEnum';
import { SelectProps } from './interface';
import styles from './Select.module.scss';

const Select: FC<SelectProps> = memo(
	({ options, selected, onChange: onSelect, label, defaultOption, hasError, errorMessage, isView, ...restProps }) => {
		const [selectedValue, setSelectedValue] = useState(selected);

		const onChange = useCallback(
			(event: ChangeEvent<HTMLSelectElement>) => {
				setSelectedValue(event.target.value);
				if (onSelect) onSelect(event.target.value);
			},
			[onSelect]
		);

		useEffect(() => {
			if (!selectedValue && options.length) {
				const valueToSelect = defaultOption ? defaultOption.value : options[0].value;
				setSelectedValue(valueToSelect);
				if (onSelect) onSelect(valueToSelect);
			}

			if (selectedValue === '') {
				const valueToSelect = defaultOption ? defaultOption.value : options[0].value;
				setSelectedValue(valueToSelect);
				if (onSelect) onSelect(valueToSelect);
			}

			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [options]);

		const errMessage = typeof errorMessage === 'function' ? errorMessage() : errorMessage;

		return (
			<div className={`${styles.formControl} ${hasError ? styles.hasError : ''} `}>
				{label && <label className={`${styles.formLabel}  ${isView ? styles.biggerlabel : ''}`}>{label}</label>}
				{isView ? (
					<div className={styles.biggerText}>
						{label === 'Operator' ? OPERATOR_NAMES[selected as keyof typeof OPERATOR_NAMES] : selected}
					</div>
				) : (
					<div className={styles.formSelect}>
						<select
							value={selectedValue}
							onChange={onChange}
							data-testid={`select-component-${restProps.name}`}
							{...restProps}
						>
							{defaultOption && (
								<option
									className={styles.defaultOption}
									{...{ value: defaultOption.value, disabled: defaultOption.disabled }}
								>
									{defaultOption.label}
								</option>
							)}
							{options.map(({ label: name, value, disabled }) => (
								<option key={value} {...{ value, disabled }}>
									{name}
								</option>
							))}
						</select>
					</div>
				)}
				{hasError && <span className={styles.formControlError}>{errMessage}</span>}
			</div>
		);
	}
);

Select.defaultProps = {
	name: 'select',
	selected: '',
	label: '',
	hasError: false,
	defaultOption: null,
	errorMessage: () => i18n.t('components.select.default_error_message'),
};

Select.displayName = 'Select';

export default Select;
