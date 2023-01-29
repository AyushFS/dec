import React from 'react';
import { render, screen } from '@testing-library/react';
import Input from './Input';
import { InputTypes } from './constants';

describe('Input component', () => {
	test('renders Input component', () => {
		render(<Input />);
		expect(screen.getByTestId('input-form-control')).toBeInTheDocument();
	});

	describe('Attributes', () => {
		test('should set data-testid attribute for Input if testId prop is set', () => {
			const attribtues = {
				testId: 'input-field',
			};
			render(<Input {...attribtues} />);
			expect(screen.getByTestId('input-field')).toBeInTheDocument();
		});

		test('should set id attribute for Input if inputId prop is set', () => {
			const attribtues = {
				testId: 'input-field',
				id: 'input-id',
			};
			render(<Input {...attribtues} />);
			expect(screen.getByTestId('input-field')).toHaveAttribute('id', 'input-id');
		});

		test('should set value for Input if value prop is set', () => {
			const attribtues = {
				testId: 'input-field',
				value: 'myvalue',
				onChange: () => {},
			};
			render(<Input {...attribtues} />);
			expect(screen.getByTestId('input-field')).toHaveAttribute('value', 'myvalue');
		});

		Object.keys(InputTypes).forEach((inputType) => {
			test(`should set type to ${inputType} for Input if type prop is set to ${inputType}`, () => {
				const attribtues = {
					testId: 'input-field',
					type: inputType as InputTypes,
				};
				render(<Input {...attribtues} />);
				expect(screen.getByTestId('input-field')).toHaveAttribute('type', inputType);
			});
		});

		test('should set type to text for Input if type prop is not set', () => {
			const attribtues = {
				testId: 'input-field',
			};
			render(<Input {...attribtues} />);
			expect(screen.getByTestId('input-field')).toHaveAttribute('type', InputTypes.text);
		});
	});

	describe('Label and Required asterisk', () => {
		test('should not render label if label prop is not set', () => {
			const attribtues = {
				testId: 'input-field',
			};
			render(<Input {...attribtues} />);
			expect(screen.queryByText('mylabel')).not.toBeInTheDocument();
		});

		test('should set label for Input if label prop is set', () => {
			const attribtues = {
				label: 'mylabel',
			};
			render(<Input {...attribtues} />);
			expect(screen.getByText('mylabel')).toBeInTheDocument();
		});

		test('should set required attribute for input field if required prop is set to true', () => {
			const attribtues = {
				testId: 'input-field',
				label: 'mylabel',
				required: true,
			};
			render(<Input {...attribtues} />);
			// expect(screen.getByText('mylabel*')).toBeInTheDocument();
			expect(screen.getByTestId('input-field')).toHaveAttribute('required');
		});

		test('should no set required attribute for input field if required prop is set to false', () => {
			const attribtues = {
				testId: 'input-field',
				required: false,
			};
			render(<Input {...attribtues} />);
			expect(screen.getByTestId('input-field')).not.toHaveAttribute('required');
		});
	});

	describe('Prefix and suffix', () => {
		test('should set prefix for Input if prefix prop is set', () => {
			const attribtues = {
				prefix: 'some-prefix-text',
			};
			render(<Input {...attribtues} />);
			const prefix = screen.getByText('some-prefix-text');
			expect(prefix).toBeInTheDocument();
			expect(prefix).toHaveClass('input-group__prefix');
		});

		test('should set suffix if suffix prop is set', () => {
			const attribtues = {
				suffix: 'some-suffix-text',
			};
			render(<Input {...attribtues} />);
			const suffix = screen.getByText('some-suffix-text');
			expect(suffix).toBeInTheDocument();
			expect(suffix).toHaveClass('input-group__suffix');
		});
	});

	describe('Helper text and error message', () => {
		it('should set helper text for Input if helperText prop is set', () => {
			const attribtues = {
				helperText: 'helper text',
			};
			render(<Input {...attribtues} />);
			expect(screen.getByTestId('input-form-control')).toHaveClass('has-help');
			const helperText = screen.getByText('helper text');
			expect(helperText).toBeInTheDocument();
			expect(helperText).toHaveClass('form-control__help');
		});
		it('should set error message for Input if errorMessage prop is set', () => {
			const attribtues = {
				errorMessage: 'error message',
			};
			render(<Input {...attribtues} />);
			expect(screen.getByTestId('input-form-control')).toHaveClass('has-error');
			const helperText = screen.getByText('error message');
			expect(helperText).toBeInTheDocument();
			expect(helperText).toHaveClass('form-control__error');
		});
	});
});
