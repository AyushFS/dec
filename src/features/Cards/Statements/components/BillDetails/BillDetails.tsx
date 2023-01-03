import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactFCC } from '../../../../../common/interface/react';
import Button, { ButtonColors, ButtonSizes } from '../../../../../components/Button';
import InfoBox from '../../../../../components/InfoBox';
import { getShortDate, getShortMonthName } from '../../../../../common/utilities/validationChecker/Utils';
import FsIcon from '../../../../../components/FsIcon';
import { IconTypes } from '../../../../../components/FsIcon/constants';
import { ReactComponent as ArrowRight } from '../../../../../assets/images/icons/arrow-right.svg';
import { useCurrencyFormat } from '../../../../../common/utilities/currencyFormat';
import useGlobalState from '../../../../GlobalState/useGlobalState';
import BackButton from '../../../ManageCards/AddCard/BackButton/BackButton';
import { Bill, StatementData } from '../../interface';
import { getWarningMessage } from '../DueAmountAlertBox/utils';
import { WarningMessage } from '../DueAmountAlertBox/interface';
import DownloadFileComponent from '../../../../../components/DownloadFileComponent';
import UnderstandBill from '../UnderstandBill';
import styles from './BillDetails.module.scss';

interface BillDetailsProps {
	bill: Bill;
	statements: StatementData[];
	onBackClick: () => void;
	onPayNowClick: () => void;
}

const BillDetails: ReactFCC<BillDetailsProps> = (props) => {
	const { t } = useTranslation();
	const { bill, statements, onBackClick, onPayNowClick } = props;
	const { currentCountry } = useGlobalState();
	const { formatCurrencyByCountry, currencySymbolByCountry } = useCurrencyFormat(currentCountry);

	if (parseFloat(bill?.totalOutstanding || '0') < 1) {
		return null;
	}

	const warningMessage: WarningMessage | null = Object.keys(bill).length ? getWarningMessage(bill) : null;
	const latestStatement = statements[0];
	const statementMonthName = latestStatement
		? t(`common.months_short.${getShortMonthName(latestStatement.generationMonth - 1).toLocaleLowerCase()}`)
		: '';

	return (
		<div data-testid="bill-details-component">
			<div className={styles.BillDetails}>
				<div className={styles.backButtonContainer}>
					<BackButton onBack={onBackClick} />
				</div>
				<div className={styles.Section}>
					<div className={styles.BillDetailsTitle}>{t('statements.bill_details.title')}</div>
					<div className={styles.BillDetailsDescription}>{t('statements.bill_details.description')}</div>
				</div>
				{warningMessage && (
					<div className={styles.Section}>
						<div className={styles.BillDetailsAlert}>
							<InfoBox type={warningMessage.theme as any} size="small" borderless iconSize={16}>
								{t(warningMessage.message)}
							</InfoBox>
						</div>
					</div>
				)}
				<div className={styles.Section}>
					<div className={styles.BillDetailsData}>
						<div className={styles.BillDetailsDataItem}>
							<div className={styles.BillDetailsDataItemTitle}>{t('statements.bill_details.due_date')}</div>
							<div className={styles.BillDetailsDataItemValue}>{getShortDate(new Date(bill.paymentDueDate))}</div>
						</div>
						<div className={styles.BillDetailsDataItem}>
							<div className={styles.BillDetailsDataItemTitle}>{t('statements.bill_details.minimum_due')}</div>
							<div className={styles.BillDetailsDataItemValue}>
								<span className={styles.CurrencyCode}>{currencySymbolByCountry}</span>
								{formatCurrencyByCountry(bill.minimumAmountDue, false)}
							</div>
						</div>
						<div className={styles.BillDetailsDataItem}>
							<div className={styles.BillDetailsDataItemTitle}>{t('statements.bill_details.total_amount_due')}</div>
							<div className={styles.BillDetailsDataItemValue}>
								<span className={styles.CurrencyCode}>{currencySymbolByCountry}</span>
								{formatCurrencyByCountry(bill.totalOutstanding, false)}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.Section}>
					<div className={styles.BillDetailsData}>
						<div className={styles.BillDetailsDataStatement}>
							<div className={styles.BillDetailsDataItemValue}>
								{t('statements.bill_details.statement')} {statementMonthName && `(${statementMonthName})`}
							</div>
							<DownloadFileComponent
								element={Button}
								elementAttrs={{
									link: true,
									disabled: !latestStatement || latestStatement?.dmsId <= 0,
								}}
								statement={latestStatement}
							>
								<FsIcon size={24} type={IconTypes.svg}>
									<ArrowRight />
								</FsIcon>
							</DownloadFileComponent>
						</div>
					</div>
					<UnderstandBill>
						<div className={styles.UnderstandBillButton}>
							<Button link color={ButtonColors.primary} size={ButtonSizes.small}>
								{t('statements.bill_details.understand_the_bill')}
							</Button>
						</div>
					</UnderstandBill>
				</div>
				<div className={styles.Actions}>
					<span className={styles.Primary}>
						<Button color={ButtonColors.primary} size={ButtonSizes.small} onClick={onPayNowClick}>
							{t('statements.bill_details.pay_bill_now')}
						</Button>
					</span>
				</div>
			</div>
		</div>
	);
};

export default BillDetails;
