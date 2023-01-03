import { HTMLProps } from 'react';

export interface Option {
	label: React.ReactNode;
	value: string;
	disabled?: boolean;
}

export interface SelectProps extends Omit<HTMLProps<HTMLSelectElement>, 'selected' | 'onSelect' | 'onChange'> {
	options: Array<Option>;
	onChange: (value: string) => void;
	label?: string;
	selected?: string;
	hasError?: boolean;
	defaultOption?: Option | null;
	errorMessage?: string | (() => string);
	isView?: boolean;
	value?: string;
}
