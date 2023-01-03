import React, { useState } from 'react';
import { ReactFCC } from '../../common/interface/react';
import './List.scss';

interface TreeItemProps {
	id: string;
	onSelectCallback?: (e: React.MouseEvent<HTMLInputElement>) => void;
	label: string;
	icon?: React.ReactNode;
	isSelected: boolean | undefined;
	children?: React.ReactNode;
	prepend?: React.ReactNode;
	append?: React.ReactNode;
	isCollapsible?: boolean;
	isSelectable?: boolean;
}

const getSelectedClass = (selected: boolean | undefined, children: React.ReactNode | undefined) => {
	if (!selected) return '';
	if (selected && !children) return 'list-item--active';
	if (children) return 'list-item--active-child';
	return '';
};

const TreeItem: ReactFCC<TreeItemProps> = ({
	onSelectCallback,
	label,
	isSelected,
	children,
	prepend,
	append,
	isCollapsible,
	isSelectable,
}: TreeItemProps) => {
	const [isCollapsed, setIsCollapsed] = useState<boolean | null>(false);
	const [selected, setSelected] = useState(isSelected);

	const attrs = {
		'data-testid': 'tree-item-component',
		className: ['list-item', children ? 'list-group__header' : '', getSelectedClass(selected, children)]
			.filter((val) => val)
			.join(' ')
			.trim(),
		onClick: (e: React.MouseEvent<HTMLInputElement>) => {
			if (isSelectable) setSelected(!selected);
			if (isCollapsible) setIsCollapsed(!isCollapsed);
			if (typeof onSelectCallback === 'function') {
				onSelectCallback(e);
			}
		},
	};

	const itemLabel = (
		<div {...attrs}>
			<div className="list-item--prepend list-item__icon">{prepend}</div>
			<div className="list-item__title">{label}</div>
			<div className="list-item--append list-item__icon">{append}</div>
		</div>
	);

	if (children) {
		return (
			<div className="list-group" data-testid="tree-item-children">
				{itemLabel}
				{!isCollapsed && children}
			</div>
		);
	}
	return itemLabel;
};
export default TreeItem;
