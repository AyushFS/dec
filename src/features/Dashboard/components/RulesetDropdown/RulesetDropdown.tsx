import React, { useState } from 'react';
import styles from './RulesetDropdown.module.scss';
import TwoBtnModal from '../TwoBtnModal/TwoBtnModal';
import UseDashboard from '../../UseDashboard';

interface RulesetDropdownProps {
	on: boolean;
	rulesetId: string | number;
	onClick: () => void;
}

const RulesetDropdown = ({ on, rulesetId, onClick }: RulesetDropdownProps) => {
	const [openModal, setOpenModal] = useState(false);
	const { deleteRuleset } = UseDashboard();

	const handleModalToggle = () => {
		setOpenModal((preV) => !preV);
	};

	const handleDelete = () => {
		deleteRuleset(rulesetId);
		handleModalToggle();
	};

	return (
		<>
			<span
				onClick={(e) => {
					e.stopPropagation();
					onClick();
				}}
				className={styles.outer_container}
			>
				...
				{on && (
					<div className={styles.inner_container} onClick={(e) => e.stopPropagation()}>
						<div>Edit Ruleset</div>
						<div
							onClick={() => {
								onClick();
								handleModalToggle();
							}}
						>
							Delete
						</div>
					</div>
				)}
			</span>
			{/* modal section */}

			<TwoBtnModal
				openModal={openModal}
				firstBtnText="Cancel"
				secondBtnText="Delete Ruleset"
				handleModalToggle={handleModalToggle}
				handleFirstBtn={handleModalToggle}
				handleSecondBtn={handleDelete}
			/>
		</>
	);
};

export default RulesetDropdown;
