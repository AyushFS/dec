import React, { ChangeEvent, FC, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { COUNTRY_CODE } from '../../../../common/constant/enum/GeneralEnum';
import Input, { InputTypes } from '../../../../components/Input';
import Select from '../../../../components/Select';
import { MobileInputProps } from './interface';
import styles from './MobileInput.module.scss';

const defaultProps = { countryCode: COUNTRY_CODE.SG, phoneNumber: '' };
const countryCodeOptions = [
	{
		label: '🇸🇬 +65',
		value: COUNTRY_CODE.SG,
	},
];

const MobileInput: FC<MobileInputProps> = memo(
	({ label, name, initialMobileNumber, onChange, onBlur, hasError, errorMessage }) => {
		const { t } = useTranslation();
		const [mobileNumber, setMobileNumber] = useState(initialMobileNumber?.phoneNumber);
		const [countryCode, setCountryCode] = useState<string>(
			initialMobileNumber?.countryCode || defaultProps.countryCode
		);

		const onInput = (event: ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target;
			if (value.length > event.target.maxLength) event.target.value = value.slice(0, event.target.maxLength);

			if (onChange) {
				onChange({ phoneNumber: event.target.value, countryCode });
			}
			setMobileNumber(event.target.value);
		};

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'e') event.preventDefault();
		};
		return (
			<div className={`${styles.formControl} ${hasError ? styles.hasError : ''}`}>
				{label && <label className={styles.formLabel}>{t('components.mobile_input.label')}</label>}
				<div className={styles.fields}>
					<Select
						name={`mobile-country-code-${name}`}
						defaultOption={null}
						value={mobileNumber}
						options={countryCodeOptions}
						onChange={setCountryCode}
					/>
					<Input
						testId={`mobile-number-${name}`}
						name={`mobile-number-${name}`}
						onKeyDown={onKeyDown}
						onInput={onInput}
						maxLength="10"
						value={mobileNumber}
						type={InputTypes.number}
						onBlur={onBlur}
					/>
				</div>
				{hasError && <span className={styles.formControlError}>{errorMessage}</span>}
			</div>
		);
	}
);

MobileInput.defaultProps = {
	label: 'Mobile number',
	initialMobileNumber: defaultProps,
	hasError: false,
};

MobileInput.displayName = 'MobileInput';

export default MobileInput;
