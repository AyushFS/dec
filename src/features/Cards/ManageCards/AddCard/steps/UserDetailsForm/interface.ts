export interface UserDetailsFormProps {
	onCancel: () => void;
	age?: number;
	companyName?: string;
	onBack?: () => void;
	onContinue?: () => void;
}
