import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ruleset as RulesetInterface } from '../../../../common/interface/ruleset';
import { ReactFCC } from '../../../../common/interface/react';
import styles from './Ruleset.module.scss';
import UseDashboard from '../../UseDashboard';
import Content from './Content/Content';
import Action from './Action/Action';

interface RulesetCompProps {
	ruleset: RulesetInterface;
}

const Ruleset: ReactFCC<RulesetCompProps> = ({ ruleset }) => {
	const [isActive, setIsActive] = useState(false);
	const [isOpenDropdown, setIsOpenDropdown] = useState(false);
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

	useEffect(() => {
		if (isOpenDropdown) {
			setTimeout(() => {
				setIsOpenDropdown(false);
			}, 5000);
		}
	}, [isOpenDropdown]);

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
				setIsOpenDropdown((preV) => !preV);
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
		<div onClick={() => setIsOpenDropdown(false)} className={styles.container}>
			{/* left section */}
			<Content ruleset={ruleset} />
			{/* right section */}
			<Action
				isActive={isActive}
				handleToggle={handleToggle}
				isOpenDropdown={isOpenDropdown}
				ruleset={ruleset}
				handleViewRuleset={handleViewRuleset}
			/>
		</div>
	);
};

export default Ruleset;
