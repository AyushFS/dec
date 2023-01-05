import React, { useState } from 'react';
import styles from './RulesetDropdown.module.scss';
import TwoBtnModal from '../TwoBtnModal/TwoBtnModal';
import UseDashboard from '../../UseDashboard';
import svgIcons from '../../../../components/FsIcon/FsIconSvg';
import AddRuleset from '../AddRuleset/AddRuleset';

interface RulesetDropdownProps {
	on: boolean;
	ruleset: any;
	onClick: () => void;
}

const RulesetDropdown = ({ on, ruleset, onClick }: RulesetDropdownProps) => {
	const [openModal, setOpenModal] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [currentRuleset, setCurrentRuleset] = useState(ruleset);

	const { deleteRuleset, setSelectedRuleset, updateRuleset } = UseDashboard();

	const handleModalToggle = () => {
		setOpenModal((preV) => !preV);
	};

	const handleDelete = () => {
		deleteRuleset(ruleset.id);
		handleModalToggle();
	};

	const handleEditModalToggle = () => setOpenEditModal((preV) => !preV);

	const handleChangeRuleset = () => {
		setSelectedRuleset(currentRuleset);
		updateRuleset('', currentRuleset, currentRuleset.id, true);
		handleEditModalToggle();
	};

	const handleUpdateRuleset = (key: string, value: string) => {
		const temp = { ...currentRuleset, [key]: value };
		setCurrentRuleset(temp);
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
				{svgIcons.Tripledot}
				{on && (
					<div className={styles.inner_container} onClick={(e) => e.stopPropagation()}>
						<div
							onClick={() => {
								onClick();
								handleEditModalToggle();
							}}
						>
							Edit Ruleset
						</div>
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

			<AddRuleset
				isEdit
				openModal={openEditModal}
				handleToggle={handleEditModalToggle}
				currentRuleset={currentRuleset}
				handleUpdateRuleset={handleUpdateRuleset}
				handleAddRuleset={handleChangeRuleset}
			/>
		</>
	);
};

export default RulesetDropdown;
