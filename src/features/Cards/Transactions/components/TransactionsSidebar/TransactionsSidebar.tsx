import React, { FC, memo } from 'react';
import { Transaction } from '../../types';
import TransactionDetails from '../TransactionDetails/TransactionDetails';

interface TransactionsSidebarProps {
	transaction: Transaction;
}

const TransactionsSidebar: FC<TransactionsSidebarProps> = memo(({ transaction }) => {
	return (
		<div data-testid="transaction-sidebar-component">
			<TransactionDetails transaction={transaction} />
		</div>
	);
});

export default TransactionsSidebar;
