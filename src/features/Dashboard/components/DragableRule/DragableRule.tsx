import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Rule from '../Rule/Rule';
import styles from './DragableRule.module.scss';

const DragableRule = ({ rule, index, selectedRuleset, isDrawerOpen, deleteRule, updateRule }: any) => {
	return (
		<Draggable index={index} isDragDisabled={isDrawerOpen('rule')} draggableId={`draggable-${rule.rule_id}`}>
			{(provided) => (
				<div className={styles.cardInnerContent} ref={provided.innerRef} {...provided.draggableProps}>
					<span className={styles.ruleIndex}>{index < 9 ? `0${index + 1}` : ''}</span>
					<Rule
						rule={rule}
						deleteRule={deleteRule}
						updateRule={updateRule}
						rulesetId={selectedRuleset.id}
						dragHandle={provided}
					/>
				</div>
			)}
		</Draggable>
	);
};

export default DragableRule;
