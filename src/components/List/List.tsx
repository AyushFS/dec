import React, { Fragment } from 'react';
import { ReactFCC } from '../../common/interface/react';
import TreeItem from './TreeItem';
import './List.scss';

export type Tree = TreeBranch[];

export interface TreeBranch {
	id: string;
	label: string;
	prepend?: React.ReactNode;
	append?: React.ReactNode;
	items?: Tree;
	selected?: boolean;
}

export interface RecursiveTreeProps {
	items: Tree;
	onSelectCallback?: (value: TreeBranch) => void;
}

interface ListProps extends RecursiveTreeProps {}

const List: ReactFCC<ListProps> = ({ items, onSelectCallback }) => {
	const createList = (listItems: TreeBranch[]) => {
		return (
			<div className="list">
				{listItems.map((item: TreeBranch) => (
					// eslint-disable-next-line
					<Fragment key={item.id}>{createTree(item)}</Fragment>
				))}
			</div>
		);
	};

	const createTree = (item: TreeBranch) => {
		return (
			<TreeItem
				id={item.id}
				key={item.id}
				prepend={item.prepend}
				append={item.append}
				// eslint-disable-next-line
				onSelectCallback={(e: React.MouseEvent<HTMLElement>) => {
					if (typeof onSelectCallback === 'function') {
						onSelectCallback(item);
					}
				}}
				isSelected={item.selected}
				label={item.label}
			>
				{item.items?.length && <div className="list-group__items">{createList(item.items)}</div>}
			</TreeItem>
		);
	};

	return (
		<nav className="list-container" data-testid="list-component">
			{createList(items)}
		</nav>
	);
};

export default List;
