export interface SnackbarProps {
	message: string;
	icon?: React.ReactNode;
	onAction?: () => void;
	onSnackbarDismiss?: () => void;
	timeout?: number | null;
}
