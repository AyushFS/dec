import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactFCC } from '../../../../../common/interface/react';
import Button, { ButtonColors, ButtonSizes } from '../../../../../components/Button';
import { COUNTRY_CODE } from '../../../../../common/constant/enum/GeneralEnum';
import Input, { InputTypes } from '../../../../../components/Input';
import { useCurrencyFormat } from '../../../../../common/utilities/currencyFormat';
import useGlobalState from '../../../../GlobalState/useGlobalState';
import BackButton from '../../../ManageCards/AddCard/BackButton/BackButton';
import { useRequestNotifyRepaymentTransferred } from '../../../useRequest';
import { Bill } from '../../interface';
import PaymentConfirmationModal from '../PaymentConfirmationModal';
import BankDetails from './BankDetails';
import { PaymentOption } from './interface';
import styles from './PayBill.module.scss';

interface PayBillProps {
	bill: Bill;
	onBackClick: () => void;
	onPaidClick: () => void;
	onPayLaterClick: () => void;
}

const PayBill: ReactFCC<PayBillProps> = (props) => {
	const { t } = useTranslation();
	const { bill, onBackClick, onPaidClick, onPayLaterClick } = props;
	const { currentCountry, isCurrentCountry } = useGlobalState();
	const { formatCurrencyByCountry, currencySymbolByCountry } = useCurrencyFormat(currentCountry);
	const [amount, setAmount] = useState<number>(0);
	const [seletedOption, setSelectedOption] = useState<number | null>(null);
	const [showInput, setShowInput] = useState<boolean>(false);
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
	const [bankDetailsLoaded, setBankDetailsLoaded] = useState<boolean>(false);

	const bankInfoHeading = useMemo(() => {
		if (isCurrentCountry(COUNTRY_CODE.ID)) {
			return t('statements.pay_bill.to_modalku_account');
		}
		return t('statements.pay_bill.to_funding_societies_account');
	}, [isCurrentCountry, t]);

	const { isFetching, refetch: notifyRepaymentTransferred } = useRequestNotifyRepaymentTransferred({
		onSuccess: () => {
			setShowConfirmation(true);
		},
		onError: (err: any) => {
			console.log('error', err);
		},
		options: { enabled: false },
	});

	const paymentOptions: PaymentOption[] = useMemo(
		() => [
			{
				label: t('statements.pay_bill.payment_options.total_amount_due'),
				value: bill.totalOutstanding,
				showInput: false,
			},
			{
				label: t('statements.pay_bill.payment_options.minimum_due'),
				value: bill.minimumAmountDue,
				showInput: false,
			},
			{
				label: t('statements.pay_bill.payment_options.other_amount'),
				value: '',
				showInput: true,
			},
		],
		[bill, t]
	);

	const selectOption = (index: number, paymentOption: PaymentOption) => {
		setSelectedOption(index);
		setAmount(parseFloat(paymentOption.value));
		setShowInput(paymentOption.showInput);
	};

	useEffect(() => {
		selectOption(0, paymentOptions[0]);
	}, [paymentOptions]);

	const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const amountValue = (parseFloat(e.target.value) || 0) < 0 ? 0 : parseFloat(e.target.value);
		setAmount(amountValue);
	};
	const onMadeTheTransferClick = () => {
		notifyRepaymentTransferred();
	};
	const onBackToStatementClick = () => {
		onPaidClick();
	};
	const onBankDetailsLoaded = () => {
		setBankDetailsLoaded(true);
	};

	if (parseFloat(bill?.totalOutstanding || '0') < 1) {
		return null;
	}

	return (
		<div data-testid="pay-bill-component">
			<div className={styles.PayBill}>
				<div className={styles.backButtonContainer}>
					<BackButton onBack={onBackClick} />
				</div>
				<div className={styles.Section}>
					<div className={styles.PayBillTitle}>{t('statements.pay_bill.title')}</div>
					<div className={styles.PayBillDescription}>{t('statements.pay_bill.description')}</div>
				</div>
				<div className={styles.Section}>
					<div className={styles.PaymentOptions}>
						{paymentOptions.map((paymentOption, index) => (
							<div
								className={[styles.PaymentOptionsItem, seletedOption === index ? styles.selected : ''].join(' ')}
								key={paymentOption.label}
								onClick={() => selectOption(index, paymentOption)}
							>
								{paymentOption.value !== '' && (
									<div className={styles.PaymentOptionsItemAmount}>
										<span className={styles.CurrencyCode}>{currencySymbolByCountry}</span>
										{formatCurrencyByCountry(paymentOption.value || 0, false)}
									</div>
								)}
								<div className={styles.PaymentOptionsItemLabel}>{paymentOption.label}</div>
							</div>
						))}
					</div>
				</div>
				{showInput && (
					<div className={styles.Section}>
						<div className={styles.CustomAmountTitle}>How much do you want to pay?</div>
						<div className={styles.CustomAmountInput}>
							<Input
								type={InputTypes.number}
								prefix={currencySymbolByCountry}
								value={amount}
								onChange={handleValueChange}
								autoComplete="off"
								testId="custom-amount-input"
								autoFocus
							/>
						</div>
						<div className={styles.CustomAmountCharges}>
							<ul>
								<li>{t(`statements.pay_bill.notes.${currentCountry}.late_fee_charged`)}</li>
								<li>{t(`statements.pay_bill.notes.${currentCountry}.rollover_fee_charged`)}</li>
							</ul>
						</div>
					</div>
				)}
				<div className={styles.Section}>
					<div className={styles.BankDetailsTitle}>{t('statements.pay_bill.pay_by_bank_transfer')}</div>
					<div className={`${styles.PayBillDescription} ${styles.note} ${styles.dark}`}>
						{t('statements.pay_bill.transfer_full_amount_of')}{' '}
						<span className={styles.CurrencyCode}>{currencySymbolByCountry}</span>{' '}
						{formatCurrencyByCountry(amount || 0, false)} {bankInfoHeading}
					</div>
					<BankDetails onBankDetailsLoaded={onBankDetailsLoaded} />
					{isCurrentCountry(COUNTRY_CODE.SG) && (
						<div className={`${styles.PayBillDescription} ${styles.note}`}>
							{t('statements.pay_bill.include_the_reference')}
						</div>
					)}
				</div>
				<div className={styles.Actions}>
					<span className={styles.Primary}>
						<Button
							color={ButtonColors.primary}
							size={ButtonSizes.small}
							onClick={onMadeTheTransferClick}
							disabled={isFetching || !bankDetailsLoaded}
						>
							{t('statements.pay_bill.made_the_transfer')}
						</Button>
					</span>
					<span className={styles.Primary}>
						<Button
							link
							color={ButtonColors.secondary}
							size={ButtonSizes.small}
							onClick={onPayLaterClick}
							disabled={!bankDetailsLoaded}
						>
							{t('statements.pay_bill.will_pay_later')}
						</Button>
					</span>
				</div>
			</div>
			{showConfirmation && (
				<PaymentConfirmationModal onClose={() => setShowConfirmation(false)} onButtonClick={onBackToStatementClick} />
			)}
		</div>
	);
};

export default PayBill;
