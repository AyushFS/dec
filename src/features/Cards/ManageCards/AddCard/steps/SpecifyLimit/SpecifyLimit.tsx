import React, { memo, FC, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useTextInput from '../../../../../../common/hooks/useTextInput';
import Input, { InputTypes } from '../../../../../../components/Input';
import Select from '../../../../../../components/Select';
import { useRequestAddCard, useGetSpendPurposes } from '../../useRequest';
import AddCardConfirmation from '../AddCardConfirmation/AddCardConfirmation';
import { SpecifyLimitEntity, SpecifyLimitProps } from './interface';
import styles from './SpecifyLimit.module.scss';
import BackButton from '../../BackButton/BackButton';
import { FormErrors } from '../../../../../../common/hooks/useFormValidation/types';
import { validateForm } from '../../../../../../common/hooks/useFormValidation/validateForm';
import { getValidationSchema, spendLimitValidator } from './config';
import useFormValidationEventHandlers from '../../../../../../common/hooks/useFormValidation/useFormValidationEventHandlers';
import useAuth from '../../../../../Auth/useAuth';
import useAddCard from '../../useAddCard';
import { ButtonTypes } from '../../../../../../components/Button';
import useRequestUpdateCardLimit from '../../../useRequest';
import { UpdateCardLimitParams } from '../../../interface';
import useGlobalState from '../../../../../GlobalState/useGlobalState';
import { useCurrencyFormat } from '../../../../../../common/utilities/currencyFormat';
import { VALIDATOR } from '../../../../../../common/hooks/useFormValidation/constants';

const SpecifyLimit: FC<SpecifyLimitProps> = memo((props) => {
	const { onCancel, onBack, maxCardLimit, currentLimit, isEditMode, footerComponent: Footer, ...restProps } = props;
	const { auth } = useAuth();
	const [spendLimit] = useTextInput('');
	const { t } = useTranslation();
	const [spendPurpose, setSpendPurpose] = useState('');
	const { userData } = useAddCard();
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [spendPurposes, setSpendPurposes] = useState([]);
	const [validationSchema] = useState(getValidationSchema());
	const [formErrors, setFormErrors] = useState<FormErrors<SpecifyLimitEntity>>({});
	const [updateInProgress, setUpdateInProgress] = useState(false);
	const { currentCountry } = useGlobalState();
	const { currencySymbolByCountry, formatCurrencyByCountry } = useCurrencyFormat(currentCountry);

	const customEventHandlers = useMemo(() => {
		return { [VALIDATOR.RANGE]: spendLimitValidator(maxCardLimit) };
	}, [maxCardLimit]);
	const eventHandlers = useFormValidationEventHandlers<SpecifyLimitEntity>(
		validationSchema,
		setFormErrors,
		customEventHandlers
	);

	const { addCardFn } = useRequestAddCard({
		onSuccess: () => setShowConfirmation(true),
	});

	const { updateCardLimit } = useRequestUpdateCardLimit({
		onSuccess: () => {
			setUpdateInProgress(false);
			onCancel();
		},
	});

	useGetSpendPurposes({
		onSuccess: (response: any) => {
			const values = response.map((item: { value: string; uuid: string }) => ({
				value: item.uuid,
				label: item.value,
			})); /* TODO: capitalize the label */
			setSpendPurposes(values);
			setSpendPurpose(values[0].value);
		},
		onError: () => setSpendPurposes([]),
		options: { enabled: !!auth },
	});

	/* add new card flow */
	const addNewCard = () => {
		let params = {};
		if (userData.userId) {
			params = { spendPurpose, limit: parseFloat(spendLimit.value), uuid: userData.userId };
		} else {
			params = {
				spendPurpose,
				role: userData.role,
				name: userData.name,
				email: userData.email,
				mobilePhoneCountryCode: userData.mobilePhoneCountryCode,
				mobilePhoneNumber: userData.mobilePhoneNumber,
				nationality: userData.nationality,
				limit: parseFloat(spendLimit.value),
			};
		}
		addCardFn(params);
	};

	/* manage card limit flow */
	const updateLimit = () => {
		const params: UpdateCardLimitParams = {
			...restProps,
			cardSpendPurposeUuid: restProps.cardSpendPurposeUuid!,
			cardUuid: restProps.cardUuid!,
			limit: parseFloat(spendLimit.value),
			spendPurposeUuid: spendPurpose,
		};
		updateCardLimit(params);
	};

	const onSubmit = (event?: any) => {
		event?.preventDefault();
		const formData = {
			spendPurpose,
			spendLimit: spendLimit.value,
		};
		const validationResult = validateForm(validationSchema, formData, customEventHandlers);
		if (validationResult.isValid) {
			if (isEditMode) {
				updateLimit();
			} else {
				addNewCard();
			}
		} else {
			setFormErrors(validationResult.result);
		}
	};

	if (showConfirmation) return <AddCardConfirmation onClose={onCancel} />;

	return (
		<div className={styles.container}>
			{!isEditMode && <BackButton onBack={onBack} />}
			<form className={styles.formContainer} onSubmit={onSubmit}>
				{!isEditMode && (
					<>
						<div className={styles.header}>
							<span>{t('manage_cards.add_card.specify_limit_page.page_title')}</span>
						</div>
						<span className={styles.message}>{t('manage_cards.add_card.specify_limit_page.page_description')}</span>
					</>
				)}
				<div>
					<span className={styles.message}>{`${t(
						'manage_cards.add_card.specify_limit_page.spend_limit_info_message'
					)} ${currencySymbolByCountry} ${formatCurrencyByCountry(parseFloat(maxCardLimit || ''), false)}`}</span>
				</div>

				{isEditMode && (
					<div>
						<span className={styles.message}>{`${t(
							'manage_cards.add_card.specify_limit_page.current_spending_limit'
						)} ${currencySymbolByCountry} ${formatCurrencyByCountry(parseFloat(currentLimit || ''), false)}`}</span>
					</div>
				)}
				<Input
					prefix="SGD"
					name="spendingLimit"
					type={InputTypes.number}
					label={t(`manage_cards.add_card.specify_limit_page.${isEditMode ? 'new_spending_limit' : 'spending_limit'}`)}
					testId="spend-limit"
					errorMessage={
						formErrors?.spendLimit?.length ? validationSchema?.spendLimit?.errorMessage[formErrors.spendLimit[0]] : ''
					}
					{...eventHandlers?.spendLimit}
					{...spendLimit}
				/>
				<Select
					name="spendPurpose"
					label={t('manage_cards.add_card.specify_limit_page.spend_purpose')}
					value={spendPurpose}
					options={spendPurposes}
					onChange={setSpendPurpose}
					hasError={!!formErrors?.spendPurpose?.length}
					errorMessage={
						formErrors?.spendPurpose?.length
							? validationSchema?.spendPurpose?.errorMessage[formErrors.spendPurpose[0]]
							: ''
					}
					{...eventHandlers?.spendPurpose}
				/>
				{updateInProgress && <span className="form-control__help">saving data...</span>}
				<Footer
					primaryButtonType={ButtonTypes.submit}
					onSecondaryButtonClick={onCancel}
					onPrimaryButtonClick={onSubmit}
				/>
			</form>
		</div>
	);
});

SpecifyLimit.defaultProps = {
	isEditMode: false,
	currentLimit: '',
};

export default SpecifyLimit;
