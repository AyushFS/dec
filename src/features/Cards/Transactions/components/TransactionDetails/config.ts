import { TRANSACTION_STATUS } from '../../constants';
import styles from './TransactionDetails.module.scss';

const transactionStatusConfig: { [k in TRANSACTION_STATUS]: { className: string } } = {
	SUCCESS: { className: styles.success },
	DECLINE: { className: styles.decline },
	'FSMK-APPROVED': { className: styles.fsmkApproved },
	REFUND: { className: styles.refund },
	REVERSAL: { className: styles.reversal },
};

export default transactionStatusConfig;
