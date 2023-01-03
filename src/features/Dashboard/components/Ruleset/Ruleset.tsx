import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Switch from '../../../../components/Switch/Switch';
import RulesetDropdown from '../RulesetDropdown/RulesetDropdown';
import Button from '../../../../components/Button';
import styles from './Ruleset.module.scss';
import UseDashboard from '../../UseDashboard';

const Ruleset = ({ ruleset }: any) => {
	const [isActive, setIsActive] = useState(false);
	const [openDropdown, setOpenDropdown] = useState(false);
	const history = useNavigate();
	const { setSelectedRuleset, updateRuleset } = UseDashboard();

	useEffect(() => {
		switch (ruleset.status) {
			case 'active':
				setIsActive(true);
				break;
			case 'inactive':
				setIsActive(false);
				break;
			default:
				break;
		}
	}, [ruleset]);

	const updateStatus = () => {
		if (!isActive) updateRuleset('status', 'active', ruleset.id);
		else updateRuleset('status', 'inactive', ruleset.id);
		setIsActive(!isActive);
	};

	const handleToggle = (type: string) => {
		switch (type) {
			case 'switch':
				updateStatus();
				break;
			case 'dropdown':
				setOpenDropdown((preV) => !preV);
				break;
			default:
				break;
		}
	};

	const handleViewRuleset = () => {
		setSelectedRuleset(ruleset);
		history('/ruleset/rule');
	};

	return (
		<div onClick={() => setOpenDropdown(false)} className={styles.container}>
			{/* left section */}
			<div className={styles.left_section}>
				<div className={styles.header}>
					<div>{ruleset.ruleset_name}</div>
					<div>{ruleset.description}</div>
				</div>
				<div>
					{ruleset.id} <span>|</span> {ruleset.country}
				</div>
				<div>No. of Rules {ruleset.rules.length}</div>
				<div>Version {ruleset.version}</div>
				<div>
					Created By {ruleset.creator} on {ruleset.created_on}
				</div>
				<div>
					Last Updated By {ruleset.creator} on {ruleset.updated_on}
				</div>
			</div>
			{/* right section */}
			<div className={styles.right_section}>
				<div className={styles.action}>
					<Switch on={isActive} onSwitch={() => handleToggle('switch')} />
					<RulesetDropdown on={openDropdown} rulesetId={ruleset.id} onClick={() => handleToggle('dropdown')} />
				</div>
				<Button flat hovered link onClick={handleViewRuleset}>
					View Ruleset &gt;
				</Button>
			</div>
		</div>
	);
};

export default Ruleset;
