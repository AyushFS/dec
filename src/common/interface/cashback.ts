export interface CashbackDetails {
	currentRemainingBalance: number;
	bankAccount: CashbackAccount | null;
}
export interface CashbackAccount {
	hasBankAccount: boolean;
	bankAccountType: string;
	bankAccountNumber: string;
	holderName: string;
}
export interface CashbackRedemption {
	amount: number;
	currency: string;
	transferDate: string;
	isTransferPending: boolean;
	accountNumber: string;
}

export interface TotalCashbackEarned {
	totalCashbackEarned: number;
}
