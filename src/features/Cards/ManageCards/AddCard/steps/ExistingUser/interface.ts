export interface ExistingUserProps {
	onCancel: () => void;
	onBack?: () => void;
	onContinue?: () => void;
}

export interface ExistingUserOptionType {
	key: string;
	title: string;
	description: string;
	cardsNum: number;
	userType: string;
}

export interface ExistingUserOptionProps extends ExistingUserOptionType {
	selected: boolean;
	onClick: () => void;
}
