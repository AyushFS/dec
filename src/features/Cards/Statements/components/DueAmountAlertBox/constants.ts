import { WarningMessage } from './interface';

export const alertMessages: { [key: string]: WarningMessage } = {
	less_than_7_days: {
		message: 'statements.pay_bill_box.alerts.pay_bill_before_due_date',
		theme: 'primary-light',
	},
	partially_paid: {
		message: 'statements.pay_bill_box.alerts.late_payment_on_min_amount',
		theme: 'primary-light',
	},
	overdue: {
		message: 'statements.pay_bill_box.alerts.avoid_rollover_interest',
		theme: 'warning-light',
	},
};

export default { alertMessages };
