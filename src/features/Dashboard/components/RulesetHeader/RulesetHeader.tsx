import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button, { ButtonColors } from '../../../../components/Button';
import styles from './RulesetHeader.module.scss';
import UseDashboard from '../../UseDashboard';
import AddRuleset from '../AddRuleset/AddRuleset';

// some of these values will be obtained from login dsta & some related API calls
const defaultRulesetValues = {
	ruleset_name: '',
	country: 'SG',
	status: 'active',
	description: '',
	id: 'SG202501-1235',
	total_rules: 0,
	version: '1.03.01',
	creator: 'Alwin T.',
	created_on: '05-12-2022',
	updated_on: '05-12-2022',
	rules: [],
};

const RulesetHeader = () => {
	const [openModal, setOpenModal] = useState(false);
	const [currentRuleset, setCurrentRuleset] = useState(defaultRulesetValues);

	const history = useNavigate();

	const { rulesets, setSelectedRuleset, addNewRuleSet } = UseDashboard();

	const handleToggle = () => setOpenModal((preV) => !preV);

	// A way to get the id - this is likely top be an API call
	const handleAddRuleset = () => {
		const id = `SG202501-1235${Math.floor(Math.random() * (10 - 1 + 1) + 1)}`;
		const response = { ...currentRuleset, id };
		setSelectedRuleset(response);
		addNewRuleSet(response);
		handleToggle();
		history('/ruleset/rule');
	};

	const handleUpdateRuleset = (key: string, value: string) => {
		const temp = { ...currentRuleset, [key]: value };
		setCurrentRuleset(temp);
	};

	return (
		<>
			<div className={styles.headerContainer}>
				<div className={styles.content}>
					<h5>Ruleset Dashboard</h5>
					<div>Published Rulesets: {rulesets.length}</div>
				</div>
				<Button color={ButtonColors.primary} onClick={handleToggle}>
					Add Ruleset
				</Button>
			</div>
			{/* Modal Section */}
			<AddRuleset
				openModal={openModal}
				handleToggle={handleToggle}
				handleUpdateRuleset={handleUpdateRuleset}
				currentRuleset={currentRuleset}
				handleAddRuleset={handleAddRuleset}
				large
			/>
		</>
	);
};

export default RulesetHeader;
