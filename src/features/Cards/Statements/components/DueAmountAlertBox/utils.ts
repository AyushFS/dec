import { isDaysAfterDate, isDaysBeforeDate } from '../../../../../common/utilities/validationChecker/Utils';
import { Bill } from '../../interface';
import { alertMessages } from './constants';
import { WarningMessage } from './interface';

export const getWarningMessage = (bill: Bill): WarningMessage | null => {
	if (isDaysBeforeDate(bill.paymentDueDate, 7)) {
		return alertMessages.less_than_7_days;
	}
	if (!bill.minimumAmountDuePaid) {
		return alertMessages.partially_paid;
	}
	if (isDaysAfterDate(bill.paymentDueDate, 3) && parseFloat(bill.totalOutstanding) > 0) {
		return alertMessages.overdue;
	}
	return null;
};

export default { getWarningMessage };
