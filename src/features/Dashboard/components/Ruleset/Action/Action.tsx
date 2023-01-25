import React from 'react';
import { ReactFCC } from '../../../../../common/interface/react';
import { Ruleset } from '../../../../../common/interface/ruleset';
import Button from '../../../../../components/Button';
import svgIcons from '../../../../../components/FsIcon/FsIconSvg';
import Switch from '../../../../../components/Switch/Switch';
import RulesetDropdown from '../../RulesetDropdown/RulesetDropdown';
import styles from './Action.module.scss';

interface ActionProps {
	isActive: boolean;
	handleToggle: (type: string) => void;
	isOpenDropdown: boolean;
	ruleset: Ruleset;
	handleViewRuleset: () => void;
}

const Action: ReactFCC<ActionProps> = ({ isActive, handleToggle, isOpenDropdown, ruleset, handleViewRuleset }) => {
	return (
		<div className={styles.right_section}>
			<div className={styles.action}>
				<Switch on={isActive} onSwitch={() => handleToggle('switch')} />
				<RulesetDropdown on={isOpenDropdown} ruleset={ruleset} onClick={() => handleToggle('dropdown')} />
			</div>
			<Button flat hovered link onClick={handleViewRuleset}>
				View Ruleset {svgIcons.ArrowRBlue}
			</Button>
		</div>
	);
};

export default Action;
