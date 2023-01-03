import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactFCC } from '../../../../../common/interface/react';
import styles from './DueAmountAlertBox.module.scss';
import FsIcon from '../../../../../components/FsIcon';
import { IconTypes } from '../../../../../components/FsIcon/constants';
import Button, { ButtonColors, ButtonSizes } from '../../../../../components/Button';
import InfoBox from '../../../../../components/InfoBox';
import { getShortDate } from '../../../../../common/utilities/validationChecker/Utils';
import { useCurrencyFormat } from '../../../../../common/utilities/currencyFormat';
import useGlobalState from '../../../../GlobalState/useGlobalState';
import { Bill } from '../../interface';
import { getWarningMessage } from './utils';
import { WarningMessage } from './interface';

const StatementIcon = (
	<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M16.5 1.5L15 0L13.5 1.5L12 0L10.5 1.5L9 0L7.5 1.5L6 0L4.5 1.5L3 0V14H0V17C0 18.66 1.34 20 3 20H15C16.66 20 18 18.66 18 17V0L16.5 1.5ZM12 18H3C2.45 18 2 17.55 2 17V16H12V18ZM16 17C16 17.55 15.55 18 15 18C14.45 18 14 17.55 14 17V14H5V3H16V17Z"
			fill="#757575"
		/>
		<path d="M12 5H6V7H12V5Z" fill="#757575" />
		<path d="M15 5H13V7H15V5Z" fill="#757575" />
		<path d="M12 8H6V10H12V8Z" fill="#757575" />
		<path d="M15 8H13V10H15V8Z" fill="#757575" />
	</svg>
);

interface DueAmountAlertBoxProps {
	bill: Bill;
	onPayNowClick: () => void;
	onViewDetailsClick: () => void;
}

const DueAmountAlertBox: ReactFCC<DueAmountAlertBoxProps> = ({ bill, onPayNowClick, onViewDetailsClick }) => {
	const { t } = useTranslation();
	const { currentCountry } = useGlobalState();
	const { formatCurrencyByCountry, currencySymbolByCountry } = useCurrencyFormat(currentCountry);

	if (parseFloat(bill?.totalOutstanding || '0') < 1) {
		return null;
	}

	const warningMessage: WarningMessage | null = Object.keys(bill).length ? getWarningMessage(bill) : null;
	return (
		<div data-testid="due-amount-alert-box-component">
			<div className={styles.DueAmountAlertBox}>
				<div className={styles.DueAmountAlertBoxDetails}>
					<div className={styles.DueAmountAndDate}>
						<div className={styles.Icon}>
							<FsIcon size={20} type={IconTypes.svg}>
								{StatementIcon}
							</FsIcon>
						</div>
						<div className={styles.DueData}>
							<div className={styles.DueAmount}>
								{t('statements.pay_bill_box.due_amount')}{' '}
								<span>
									{currencySymbolByCountry} {formatCurrencyByCountry(bill.totalOutstanding, false)}
								</span>
							</div>
							<div className={styles.DueDate}>
								{t('statements.pay_bill_box.due_on')} {getShortDate(new Date(bill.paymentDueDate))}
							</div>
						</div>
					</div>
					<div className={styles.Actions}>
						<span>
							<Button size={ButtonSizes.small} link onClick={onViewDetailsClick}>
								{t('statements.pay_bill_box.view_details')}
							</Button>
						</span>
						<span className={styles.Primary}>
							<Button color={ButtonColors.primary} size={ButtonSizes.small} onClick={onPayNowClick}>
								{t('statements.pay_bill_box.pay_bill')}
							</Button>
						</span>
					</div>
				</div>
				{warningMessage && (
					<div className={styles.DueAmountAlertBoxAlert}>
						<InfoBox type={warningMessage.theme as any} size="small" borderless iconSize={16}>
							{t(warningMessage.message)}
						</InfoBox>
					</div>
				)}
			</div>
		</div>
	);
};

export default DueAmountAlertBox;
