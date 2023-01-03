import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UseDashboard from '../../UseDashboard';
import styles from './RulesetDetails.module.scss';
import Button, { ButtonColors } from '../../../../components/Button';
import svgIcons from '../../../../components/FsIcon/FsIconSvg';
import Card from '../../../../components/Card';
import FsIcon from '../../../../components/FsIcon';
import Filter from '../Filter/Filter';
import Rule from '../Rule/Rule';
import AddRule from '../AddRule/AddRule';
import useGlobalState from '../../../GlobalState/useGlobalState';

function RulesetDetails() {
	const { selectedRuleset, deleteRule, updateRule, setSelectedRule } = UseDashboard();
	const history = useNavigate();
	// const [openDrawer, setOpenDrawer] = useState(false);

	const { toggleDrawer, isDrawerOpen, setDrawerOpen } = useGlobalState();

	// ruleset not selected then go back to '/'
	useEffect(() => {
		if (Object.keys(selectedRuleset).length === 0) history('/');
	}, [history, selectedRuleset]);

	return (
		<div className={styles.page}>
			<div>
				<Button link onClick={() => history(-1)}>
					{svgIcons.Arrowleft} Back
				</Button>
			</div>
			<div>
				<h5>{selectedRuleset.ruleset_name}</h5>
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
			<div className={styles.cardOuterContainer}>
				{selectedRuleset.rules && selectedRuleset.rules.length === 0 ? (
					<div className={styles.cardInnerContent}>
						<Card>
							<div className={styles.emptyCardContent}>
								<FsIcon size={24}>transaction-lined</FsIcon>
								<span>No rules added yet</span>
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
					<div>
						{selectedRuleset.rules &&
							selectedRuleset.rules.map((rule: any, index: number) => (
								<div key={rule.rule_id} className={styles.cardInnerContent}>
									<span>{index < 9 ? `0${index + 1}` : ''}</span>
									<Rule rule={rule} deleteRule={deleteRule} updateRule={updateRule} rulesetId={selectedRuleset.id} />
								</div>
							))}
					</div>
				)}
			</div>

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
