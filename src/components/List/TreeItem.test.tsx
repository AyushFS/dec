import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TreeItem from './TreeItem';

const item: any = {
	id: 1,
	label: 'Account',
	prepend: 'prepend',
	append: 'append',
	isSelected: true,
};
const mockOnSelected = jest.fn();

describe('TreeItem component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('renders TreeItem component', () => {
		render(<TreeItem id={item.id} isSelected={item.selected} label={item.label} />);
		expect(screen.getByTestId('tree-item-component')).toBeInTheDocument();
		expect(screen.getByTestId('tree-item-component')).not.toHaveClass('list-group__header');
	});

	test('renders TreeItem component with Label', () => {
		render(<TreeItem id={item.id} prepend={item.prepend} isSelected={item.selected} label={item.label} />);
		expect(screen.getByText(item.label)).toBeInTheDocument();
	});

	test('renders TreeItem component with Prepend item', () => {
		render(<TreeItem id={item.id} prepend={item.prepend} isSelected={item.selected} label={item.label} />);
		expect(screen.getByText(item.prepend)).toBeInTheDocument();
	});

	test('renders TreeItem component with Append item', () => {
		render(<TreeItem id={item.id} append={item.append} isSelected={item.selected} label={item.label} />);
		expect(screen.getByText(item.append)).toBeInTheDocument();
	});

	test('should render TreeItem children', () => {
		render(
			<TreeItem id={item.id} isSelected={item.selected} label={item.label}>
				Children
			</TreeItem>
		);
		expect(screen.getByTestId('tree-item-component')).toHaveClass('list-group__header');
		expect(screen.getByTestId('tree-item-children')).toBeInTheDocument();
		expect(screen.getByText('Children')).toBeInTheDocument();
	});

	describe('isSelected', () => {
		test('should be selected when isSelected is true', () => {
			render(<TreeItem id={item.id} isSelected label={item.label} />);
			expect(screen.getByTestId('tree-item-component')).toHaveClass('list-item--active');
		});

		test('should be selected when isSelected is false', () => {
			render(<TreeItem id={item.id} isSelected label={item.label} />);
			expect(screen.getByTestId('tree-item-component')).toHaveClass('list-item--active');
		});
	});

	describe('isSelectable', () => {
		test('should not select TreeItem when isSelectable is false and TreeItem is clicked', () => {
			render(<TreeItem id={item.id} isSelected={item.selected} label={item.label} />);
			expect(screen.getByTestId('tree-item-component')).not.toHaveClass('list-item--active');
			userEvent.click(screen.getByTestId('tree-item-component'));
			expect(screen.getByTestId('tree-item-component')).not.toHaveClass('list-item--active');
		});

		test('should select TreeItem when isSelectable is true and TreeItem is clicked', () => {
			render(<TreeItem id={item.id} isSelected={item.selected} label={item.label} isSelectable />);
			expect(screen.getByTestId('tree-item-component')).not.toHaveClass('list-item--active');
			userEvent.click(screen.getByTestId('tree-item-component'));
			expect(screen.getByTestId('tree-item-component')).toHaveClass('list-item--active');
		});
	});

	describe('onSelectCallback', () => {
		test('should not be selected when isSelected is false', () => {
			render(
				<TreeItem id={item.id} onSelectCallback={mockOnSelected} isSelected={item.isSelected} label={item.label} />
			);
			userEvent.click(screen.getByTestId('tree-item-component'));
			expect(mockOnSelected).toHaveBeenCalledTimes(1);
		});
	});

	describe('isCollapsible', () => {
		test('should collapse TreeItem and not show children when isCollapsible is true and TreeItem is clicked', () => {
			render(
				<TreeItem id={item.id} isSelected={item.selected} label={item.label} isCollapsible>
					Children
				</TreeItem>
			);
			expect(screen.getByText('Children')).toBeInTheDocument();
			userEvent.click(screen.getByTestId('tree-item-component'));
			expect(screen.queryByText('Children')).not.toBeInTheDocument();
		});

		test('should not collapse TreeItem and keep showing children when isCollapsible is false and TreeItem is clicked', () => {
			render(
				<TreeItem id={item.id} isSelected={item.selected} label={item.label}>
					Children
				</TreeItem>
			);
			expect(screen.getByText('Children')).toBeInTheDocument();
			userEvent.click(screen.getByTestId('tree-item-component'));
			expect(screen.getByText('Children')).toBeInTheDocument();
		});
	});
});
