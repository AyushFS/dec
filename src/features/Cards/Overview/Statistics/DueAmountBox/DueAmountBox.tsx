import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactFCC } from '../../../../../common/interface/react';
import { ReactComponent as ArrowRight } from '../../../../../assets/images/icons/arrow-right.svg';
import { getShortDate } from '../../../../../common/utilities/validationChecker/Utils';
import Button from '../../../../../components/Button';
import FsIcon from '../../../../../components/FsIcon';
import { IconTypes } from '../../../../../components/FsIcon/constants';
import { Bill } from '../../../Statements/interface';
import StatisticsCard from '../StatisticsCard';
import styles from './DueAmountBox.module.scss';

interface DueAmountBoxProps {
	bill: Bill;
	onPayBillClick: () => void;
	onViewDetailsClick: () => void;
}

const DueAmountBox: ReactFCC<DueAmountBoxProps> = (props) => {
	const { t } = useTranslation();
	const { bill, onPayBillClick, onViewDetailsClick } = props;

	const title = t('overview.due_amount_box.due_amount');
	const amount = parseFloat(bill.totalOutstanding);
	const actions = (
		<>
			<Button link flat onClick={onViewDetailsClick}>
				{t('overview.due_amount_box.view_details')}
				<FsIcon right size={8} type={IconTypes.svg}>
					<ArrowRight />
				</FsIcon>
			</Button>
			<Button link flat onClick={onPayBillClick}>
				{t('overview.due_amount_box.pay_bill')}
				<FsIcon right size={8} type={IconTypes.svg}>
					<ArrowRight />
				</FsIcon>
			</Button>
		</>
	);
	const dueOnText = (
		<>
			{t('overview.due_amount_box.due_on')} {getShortDate(new Date(bill.paymentDueDate))}
		</>
	);

	return (
		<div className={styles.DueAmountBox} data-testid="due-amount-box-component">
			<StatisticsCard title={title} amount={amount} actions={actions} otherText={dueOnText} />
		</div>
	);
};

export default DueAmountBox;
