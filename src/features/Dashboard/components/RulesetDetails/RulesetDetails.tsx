/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import UseDashboard from '../../UseDashboard';
import styles from './RulesetDetails.module.scss';
import Button, { ButtonColors } from '../../../../components/Button';
import svgIcons from '../../../../components/FsIcon/FsIconSvg';
import Card from '../../../../components/Card';
import Filter from '../Filter/Filter';
import Rule from '../Rule/Rule';
import AddRule from '../AddRule/AddRule';
import useGlobalState from '../../../GlobalState/useGlobalState';

function RulesetDetails() {
	const { selectedRuleset, deleteRule, updateRule, updateRuleset, setSelectedRule, setSelectedRuleset } =
		UseDashboard();
	const history = useNavigate();
	// const [openDrawer, setOpenDrawer] = useState(false);

	const { toggleDrawer, isDrawerOpen, setDrawerOpen } = useGlobalState();

	// ruleset not selected then go back to '/'
	useEffect(() => {
		if (Object.keys(selectedRuleset).length === 0) history('/');
	}, [history, selectedRuleset]);

	const handleDrop = (params: any) => {
		const tempRules = [...selectedRuleset.rules];
		const tempRuleset = { ...selectedRuleset };
		const srcI = params.source.index;
		const decI = params.destination.index;
		if (decI !== null) {
			tempRules.splice(decI, 0, tempRules.splice(srcI, 1)[0]);
			updateRuleset('rules', tempRules, selectedRuleset.id);
			setSelectedRuleset({ ...tempRuleset, rules: tempRules });
		}
	};

	return (
		<div className={styles.page}>
			<div className={styles.headNav}>
				<Button link onClick={() => history(-1)}>
					{svgIcons.Arrowleft} <span>Back</span>
				</Button>
			</div>
			<div className={styles.headtext}>
				<h5>
					{selectedRuleset.ruleset_name} {svgIcons.Pen}
				</h5>
				<span>Drag cards to reorder the rules</span>
			</div>
			{/* Filter section */}
			<Filter
				rulepage
				openRuleDrawer={() => {
					setSelectedRule({});
					setDrawerOpen((prev) => ({ ...prev, rule: true }));
				}}
			/>
			{/* rule container */}
			<DragDropContext onDragEnd={(params: any) => handleDrop(params)}>
				<div className={styles.cardOuterContainer}>
					{selectedRuleset.rules && selectedRuleset.rules.length === 0 ? (
						<div className={styles.cardInnerContent}>
							<Card>
								<div className={styles.emptyCardContent}>
									{svgIcons.Rule}
									<div>No rules added yet</div>
									<Button
										link
										onClick={() => {
											setSelectedRule({});
											toggleDrawer('rule');
										}}
									>
										Add new rules
									</Button>
								</div>
							</Card>
						</div>
					) : (
						<Droppable droppableId="droppable-1">
							{(provided, _) => (
								<div ref={provided.innerRef}>
									{selectedRuleset.rules &&
										selectedRuleset.rules.map((rule: any, index: number) => (
											<Draggable
												key={rule.rule_id}
												index={index}
												isDragDisabled={isDrawerOpen('rule')}
												draggableId={`draggable-${rule.rule_id}`}
											>
												{(provided, _) => (
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
										))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					)}
				</div>
			</DragDropContext>

			<div className={styles.publishBtn}>
				{!isDrawerOpen('rule') && (
					<Button
						onClick={() => {
							history(-1);
							setDrawerOpen((prev) => ({ ...prev, rule: false }));
						}}
						color={ButtonColors.primary}
					>
						Publish Ruleset
					</Button>
				)}
			</div>

			<AddRule
				openDrawer={isDrawerOpen('rule')}
				handleToggleDrawer={() => toggleDrawer('rule')}
				rulesetId={selectedRuleset.id}
			/>
		</div>
	);
}

export default RulesetDetails;
