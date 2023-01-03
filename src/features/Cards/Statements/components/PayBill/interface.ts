export interface BankDetail {
	label: string;
	slug: 'bank_account_name' | 'bank_account_number' | 'bank_name' | 'payment_reference';
}

export interface BankAccountDetails {
	bank_account_name: string;
	bank_account_number: string;
	bank_name: string;
	payment_reference: string;
}

export interface PaymentOption {
	label: string;
	value: string;
	showInput: boolean;
}
