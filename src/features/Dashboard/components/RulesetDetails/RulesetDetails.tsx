import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import UseDashboard from '../../UseDashboard';
import styles from './RulesetDetails.module.scss';
import Button, { ButtonColors } from '../../../../components/Button';
import svgIcons from '../../../../components/FsIcon/FsIconSvg';
import Card from '../../../../components/Card';
import Filter from '../Filter/Filter';
import AddRule from '../AddRule/AddRule';
import useGlobalState from '../../../GlobalState/useGlobalState';
import { Rule as RuleInterface } from '../../../../common/interface/ruleset';
import DragableRule from '../DragableRule/DragableRule';
import Input from '../../../../components/Input';

function RulesetDetails() {
	const { toggleDrawer, isDrawerOpen, setDrawerOpen } = useGlobalState();
	const { selectedRuleset, deleteRule, updateRule, updateRuleset, setSelectedRule, setSelectedRuleset } =
		UseDashboard();
	const history = useNavigate();

	const [isEdit, setIsEdit] = useState(false);
	const [rulesetName, setRulesetName] = useState('');

	// ruleset not selected then go back to '/'
	useEffect(() => {
		if (Object.keys(selectedRuleset).length === 0) history('/');
		else setRulesetName(selectedRuleset.ruleset_name);
	}, [history, selectedRuleset]);

	const handleNameUpdate = () => {
		updateRuleset('ruleset_name', rulesetName, selectedRuleset.id);
		setSelectedRuleset({ ...selectedRuleset, ruleset_name: rulesetName });
		setIsEdit(false);
	};

	const handleCancel = () => {
		setRulesetName(selectedRuleset.ruleset_name);
		setIsEdit(false);
	};

	const handleDrop = (params: DropResult) => {
		const tempRules = [...selectedRuleset.rules];
		const tempRuleset = { ...selectedRuleset };
		const srcI = params.source.index;
		const decI = params.destination && params.destination.index;
		// destination could be 0
		if (decI || decI === 0) {
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
				{!isEdit ? (
					<h5>
						{selectedRuleset.ruleset_name ? selectedRuleset.ruleset_name : '-'}
						<Button flat onClick={() => setIsEdit(true)}>
							{svgIcons.Pen}
						</Button>
					</h5>
				) : (
					<div className={styles.headInput}>
						<Input
							value={rulesetName}
							placeHolder="Insert ruleset name"
							onChange={(e: ChangeEvent<HTMLInputElement>) => setRulesetName(e.target.value)}
						/>
						<Button flat onClick={handleCancel} color={ButtonColors.secondary}>
							Cancel
						</Button>
						<Button flat onClick={handleNameUpdate} color={ButtonColors.primary}>
							Save
						</Button>
					</div>
				)}
				<span>{!isEdit && 'Drag cards to reorder the rules'}</span>
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
			<DragDropContext onDragEnd={(params) => handleDrop(params)}>
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
							{(provided) => (
								<div ref={provided.innerRef}>
									{selectedRuleset.rules &&
										selectedRuleset.rules.map((rule: RuleInterface, index: number) => (
											<DragableRule
												key={rule.rule_id}
												rule={rule}
												index={index}
												selectedRuleset={selectedRuleset}
												isDrawerOpen={isDrawerOpen}
												deleteRule={deleteRule}
												updateRule={updateRule}
											/>
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
