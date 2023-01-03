import React, { useEffect, useState } from 'react';
import Card from '../../../../components/Card';
import svgIcons from '../../../../components/FsIcon/FsIconSvg';
import Switch from '../../../../components/Switch/Switch';
import styles from './Rule.module.scss';
import useGlobalState from '../../../GlobalState/useGlobalState';
import AddRule from '../AddRule/AddRule';
import UseDashboard from '../../UseDashboard';

const Rule = ({ rule, deleteRule, rulesetId, updateRule }: any) => {
	const [isSwitchOn, setIsSwitchOn] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const { isDrawerOpen, toggleDrawer, setDrawerOpen } = useGlobalState();
	const { setSelectedRule } = UseDashboard();

	useEffect(() => {
		switch (rule.status) {
			case 'active':
				setIsSwitchOn(true);
				break;
			case 'inactive':
				setIsSwitchOn(false);
				break;
			default:
				break;
		}
	}, [rule]);

	const handleToggle = () => {
		if (isSwitchOn) updateRule('status', 'inactive', rulesetId, rule.rule_id);
		else updateRule('status', 'active', rulesetId, rule.rule_id);
		setIsSwitchOn((preV) => !preV);
	};

	return (
		<div className={styles.container}>
			<div className={styles.row}>
				<div
					className={`${styles.col} ${isDrawerOpen('rule') ? styles.fullCol : ''}`}
					onMouseEnter={() => setIsDelete(true)}
					onMouseLeave={() => setIsDelete(false)}
				>
					<Card cardPadding={0} contentPadding={4}>
						<div
							className={styles.cardContainer}
							onClick={() => {
								setSelectedRule(rule);
								setDrawerOpen((prev) => ({ ...prev, rule: true }));
							}}
						>
							<div className={styles.cardText}>
								<p>{rule.rule_name}</p>
								<span>{rule.rule_id}</span>
							</div>
							<Switch on={isSwitchOn} onSwitch={handleToggle} />
							{isDelete && (
								<span
									className={styles.deleteIcon}
									onClick={(e) => {
										e.stopPropagation();
										deleteRule(rulesetId, rule.rule_id);
									}}
								>
									{svgIcons.Delete}
								</span>
							)}
						</div>
					</Card>
				</div>
			</div>

			<AddRule
				openDrawer={isDrawerOpen('rule')}
				handleToggleDrawer={() => toggleDrawer('rule')}
				rulesetId={rulesetId}
			/>
		</div>
	);
};

export default Rule;
