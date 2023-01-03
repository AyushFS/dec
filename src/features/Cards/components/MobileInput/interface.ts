export interface MobileNumber {
	countryCode: string;
	phoneNumber: string;
}

export interface MobileInputProps {
	initialMobileNumber?: MobileNumber;
	label?: string;
	hasError?: boolean;
	errorMessage?: string;
	name?: string;
	onChange?: (value: MobileNumber) => void;
	onBlur?: (e: any) => void;
}
