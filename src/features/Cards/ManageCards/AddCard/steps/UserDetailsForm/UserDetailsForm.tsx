import React, { memo, FC, FormEvent, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FormErrors } from '../../../../../../common/hooks/useFormValidation/types';
import useFormValidationEventHandlers from '../../../../../../common/hooks/useFormValidation/useFormValidationEventHandlers';
import { validateForm } from '../../../../../../common/hooks/useFormValidation/validateForm';
import useTextInput from '../../../../../../common/hooks/useTextInput';
import { User } from '../../../../../../common/interface/user';
import Button, { ButtonColors, ButtonSizes, ButtonTypes } from '../../../../../../components/Button';
import Input, { InputTypes } from '../../../../../../components/Input';
import Select from '../../../../../../components/Select';
import MobileInput from '../../../../components/MobileInput';
import { MobileNumber } from '../../../../components/MobileInput/interface';
import { getUserRole } from '../../../../utils';
import { useRequestNationalities } from '../../useRequest';
import { UserDetailsFormProps } from './interface';
import styles from './UserDetailsForm.module.scss';
import { getValidationSchema } from './config';
import BackButton from '../../BackButton/BackButton';
import useAuth from '../../../../../Auth/useAuth';
import useAddCard from '../../useAddCard';

const frequentlyUserNationalities = ['Singaporean', 'Malaysian', 'Indonesian', 'Chinese', 'Indian', 'Thai'];

const UserDetailsForm: FC<UserDetailsFormProps> = memo(({ companyName, onCancel, onBack, onContinue }) => {
	const { assignableRoles, auth } = useAuth();
	const { t } = useTranslation();
	const [name] = useTextInput('');
	const [email] = useTextInput('');
	const [nationality, setNationality] = useState('');
	const [mobileNumber, setMobileNumber] = useState<MobileNumber>({ countryCode: '', phoneNumber: '' });
	const { setUserData } = useAddCard();
	const roleOptions = useMemo(() => {
		const assignableRoleOptions = (assignableRoles || []).map((role) => {
			const roleName = getUserRole(role);
			return { value: role, label: roleName };
		});
		return assignableRoleOptions;
	}, [assignableRoles]);
	const [role, setRole] = useState(roleOptions.length ? roleOptions[0].value : '');
	const [nationalities, setNationalities] = useState([]);
	const [formErrors, setFormErrors] = useState<FormErrors<User>>({});
	const [validationSchema] = useState(getValidationSchema());

	useRequestNationalities({
		onSuccess: (response: any) => {
			let options = response.map((item: { code: any }) => ({ value: item.code, label: item.code }));
			options = options.filter(
				(nationalityItem: { value: string }) => !frequentlyUserNationalities.includes(nationalityItem.value)
			);
			frequentlyUserNationalities.reverse().forEach((nationalityItem) => {
				options.unshift({
					label: nationalityItem,
					value: nationalityItem,
				});
			});
			setNationalities(options);
		},
		onError: () => {
			setNationalities([]);
		},
		options: { enabled: !!auth },
	});

	const eventHandlers = useFormValidationEventHandlers<User>(validationSchema, setFormErrors);

	const onSubmit = (event: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		const formData = {
			userId: '',
			name: name.value,
			email: email.value,
			nationality,
			role,
			mobilePhoneNumber: mobileNumber.phoneNumber,
			mobilePhoneCountryCode: mobileNumber.countryCode,
		};
		const validationResult = validateForm(validationSchema, formData);
		if (validationResult.isValid) {
			setUserData(formData);
			if (onContinue) onContinue();
		} else {
			setFormErrors(validationResult.result);
		}
	};

	return (
		<div className={styles.container}>
			<BackButton onBack={onBack} />
			<form className={styles.formContainer} onSubmit={onSubmit}>
				<div className={styles.header}>
					<span>{t('manage_cards.add_card.user_details_form.page_title')}</span>
				</div>
				<span className={styles.message}>{t('manage_cards.add_card.user_details_form.page_description')}</span>
				<Input
					role="textbox"
					name="userName"
					type={InputTypes.text}
					label={t('manage_cards.add_card.user_details_form.name')}
					testId="name"
					errorMessage={formErrors?.name?.length ? validationSchema?.name?.errorMessage[formErrors.name[0]] : ''}
					{...eventHandlers?.name}
					{...name}
				/>
				<Select
					role="listbox"
					name="role"
					label={t('manage_cards.add_card.user_details_form.role')}
					value={role}
					options={roleOptions}
					onChange={setRole}
					hasError={!!formErrors?.role?.length}
					errorMessage={formErrors?.role?.length ? validationSchema?.role?.errorMessage[formErrors.role[0]] : ''}
					{...eventHandlers?.role}
				/>
				<Input
					role="textbox"
					name="email"
					type={InputTypes.text}
					label={t('manage_cards.add_card.user_details_form.email')}
					testId="email"
					errorMessage={formErrors?.email?.length ? validationSchema?.email?.errorMessage[formErrors.email[0]] : ''}
					{...eventHandlers?.email}
					{...email}
				/>
				<Select
					name="nationality"
					label={t('manage_cards.add_card.user_details_form.nationality')}
					value={nationality}
					options={nationalities}
					onChange={setNationality}
					hasError={!!formErrors?.nationality?.length}
					errorMessage={
						formErrors?.nationality?.length
							? validationSchema?.nationality?.errorMessage[formErrors.nationality[0]]
							: ''
					}
					{...eventHandlers?.nationality}
				/>
				<MobileInput
					name="mobileNumber"
					onChange={setMobileNumber}
					hasError={!!formErrors?.mobilePhoneNumber?.length}
					errorMessage={
						formErrors?.mobilePhoneNumber?.length
							? validationSchema?.mobilePhoneNumber?.errorMessage[formErrors.mobilePhoneNumber[0]]
							: ''
					}
					{...eventHandlers?.mobilePhoneNumber}
				/>
				<span className={styles.message}>{`${t(
					'manage_cards.add_card.user_details_form.footer_message'
				)} ${companyName}.`}</span>
				<div className={styles.actionMenu}>
					<Button type={ButtonTypes.button} size={ButtonSizes.small} color={ButtonColors.secondary} onClick={onCancel}>
						{t('manage_cards.add_card.user_details_form.cancel_button')}
					</Button>
					<Button type={ButtonTypes.submit} size={ButtonSizes.small} color={ButtonColors.primary} onClick={onSubmit}>
						{t('manage_cards.add_card.user_details_form.continue_button')}
					</Button>
				</div>
			</form>
		</div>
	);
});

UserDetailsForm.defaultProps = {
	companyName: 'FSMK',
	age: 21,
};

export default UserDetailsForm;
