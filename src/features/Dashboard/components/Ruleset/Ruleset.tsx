import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ruleset as RulesetInterface } from '../../../../common/interface/ruleset';
import { ReactFCC } from '../../../../common/interface/react';
import Switch from '../../../../components/Switch/Switch';
import RulesetDropdown from '../RulesetDropdown/RulesetDropdown';
import Button from '../../../../components/Button';
import styles from './Ruleset.module.scss';
import UseDashboard from '../../UseDashboard';
import svgIcons from '../../../../components/FsIcon/FsIconSvg';

interface RulesetCompProps {
	ruleset: RulesetInterface;
}

const Ruleset: ReactFCC<RulesetCompProps> = ({ ruleset }) => {
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

	useEffect(() => {
		if (openDropdown) {
			setTimeout(() => {
				setOpenDropdown(false);
			}, 5000);
		}
	}, [openDropdown]);

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
					<div className={styles.name}>{ruleset.ruleset_name}</div>
					<div className={styles.description}>{ruleset.description}</div>
				</div>
				<div className={styles.content}>
					{ruleset.id} <span className={styles.divider}>|</span> {ruleset.country}
				</div>
				<div className={styles.content}>
					<span>No. of Rules </span>
					{ruleset.rules.length}
				</div>
				<div className={styles.content}>
					<span>Version</span> {ruleset.version}
				</div>
				<div className={styles.content}>
					<span>Created By</span> {ruleset.creator} on {ruleset.created_on}
				</div>
				<div className={styles.content}>
					<span>Last Updated By</span> {ruleset.creator} on {ruleset.updated_on}
				</div>
			</div>
			{/* right section */}
			<div className={styles.right_section}>
				<div className={styles.action}>
					<Switch on={isActive} onSwitch={() => handleToggle('switch')} />
					<RulesetDropdown on={openDropdown} ruleset={ruleset} onClick={() => handleToggle('dropdown')} />
				</div>
				<Button flat hovered link onClick={handleViewRuleset}>
					View Ruleset {svgIcons.ArrowRBlue}
				</Button>
			</div>
		</div>
	);
};

export default Ruleset;
