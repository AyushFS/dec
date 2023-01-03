import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Select from './Select';
import { Option } from './interface';
import { GlobalStateProvider } from '../../features/GlobalState/GlobalStateProvider';

const options = [
	{ label: 'Yes', value: 'Yes' },
	{ label: 'No', value: 'No', disabled: false },
];
const defaultErrorMessage = 'Seems there is an error above';
const defaultLabel = 'Test Label';
const defaultOption = { label: 'Choose an option', value: '' };
const queryClient = new QueryClient();

describe('Select component', () => {
	const renderSelect = (props?: {
		defaultOption?: Option | null;
		label?: string;
		hasError?: boolean;
		errorMessage?: string;
		onSelect?: (value: string) => void;
	}) => {
		const onSelectMockFn = jest.fn();
		const onSelectProp = props?.onSelect || onSelectMockFn;
		return {
			onSelect: onSelectProp,
			...render(
				<QueryClientProvider client={queryClient}>
					<GlobalStateProvider>
						<Select
							{...{
								options,
								name: 'test-select',
								label: defaultLabel,
								errorMessage: defaultErrorMessage,
								onChange: onSelectProp,
								defaultOption,
								...props,
							}}
						/>
					</GlobalStateProvider>
				</QueryClientProvider>
			),
		};
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('should render select component properly', () => {
		renderSelect();
		expect(screen.getByTestId('select-component-test-select')).toBeInTheDocument();
		expect((screen.getByText(defaultOption.label) as HTMLOptionElement).selected).toBe(true);
		expect(screen.getByText(defaultLabel)).toBeInTheDocument();
	});

	test('should not render default option if default option is not set', () => {
		renderSelect({ defaultOption: null });
		expect(screen.getByTestId('select-component-test-select')).toBeInTheDocument();
		expect(screen.queryByText(defaultOption.label)).not.toBeInTheDocument();
	});

	test('should show default error message if there is an error', () => {
		renderSelect({ hasError: true });
		expect(screen.getByText(defaultErrorMessage)).toBeInTheDocument();
	});

	test('should show provided error message if there is an error', () => {
		const errorMessage = 'Test Error Message';
		renderSelect({ hasError: true, errorMessage });
		expect(screen.getByText(errorMessage)).toBeInTheDocument();
	});

	test('should call onSelect callback function on option selection', async () => {
		const { onSelect } = renderSelect();
		const optionValueToSelect = 'Yes';
		expect((screen.getByText(defaultOption.label) as HTMLOptionElement).selected).toBe(true);
		fireEvent.change(screen.getByTestId('select-component-test-select'), { target: { value: optionValueToSelect } });
		expect((screen.getByText(optionValueToSelect) as HTMLOptionElement).selected).toBe(true);
		expect(onSelect).toHaveBeenCalledWith(optionValueToSelect);
	});

	test('should select provided option on change event', async () => {
		renderSelect({ onSelect: undefined });
		const optionValueToSelect = 'Yes';
		expect((screen.getByText(defaultOption.label) as HTMLOptionElement).selected).toBe(true);
		fireEvent.change(screen.getByTestId('select-component-test-select'), { target: { value: optionValueToSelect } });
		expect((screen.getByText(optionValueToSelect) as HTMLOptionElement).selected).toBe(true);
	});
});
