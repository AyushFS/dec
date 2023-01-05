import React from 'react';
import Button, { ButtonColors } from '../../../../components/Button';
import Input from '../../../../components/Input';
import Modal from '../../../../components/Modal';
import Select from '../../../../components/Select';
import Textarea from '../../../../components/Textarea/Textarea';
import styles from './AddRuleset.module.scss';

const status_types = [
	{ value: 'active', label: 'Active' },
	{ value: 'inactive', label: 'Inactive' },
];

const group_types = [
	{ value: 'SG', label: 'Singapore' },
	{ value: 'IN', label: 'India' },
];

interface AddRulesetProps {
	openModal: boolean;
	handleToggle: () => void;
	currentRuleset: any;
	handleUpdateRuleset: (key: string, value: string) => void;
	handleAddRuleset: () => void;
	isEdit?: boolean;
	large?: boolean;
}

const AddRuleset = ({
	openModal,
	handleToggle,
	currentRuleset,
	handleUpdateRuleset,
	handleAddRuleset,
	isEdit,
	large,
}: AddRulesetProps) => {
	return (
		<Modal
			openState={openModal}
			isClosable
			onCloseModal={handleToggle}
			title="Add Ruleset"
			extraWidth={isEdit || large}
		>
			<div className={styles.inputContainer}>
				<div className={styles.row}>
					{isEdit && (
						<div className={styles.col}>
							<Input label="Ruleset ID" value={currentRuleset.id} isView={isEdit} />
						</div>
					)}
					<div className={styles.col}>
						<Input
							label="Ruleset Name"
							value={currentRuleset.ruleset_name}
							onChange={(e: any) => handleUpdateRuleset('ruleset_name', e.target.value)}
						/>
					</div>
					{isEdit && (
						<div className={styles.col}>
							<Input
								label="Rule Status"
								radiobtns={status_types}
								selected={currentRuleset.status}
								type="radio"
								onChange={(e: any) => handleUpdateRuleset('status', e.target.value)}
							/>
						</div>
					)}
					<div className={styles.col}>
						<Select
							selected={currentRuleset.country}
							value={currentRuleset.country}
							options={group_types}
							onChange={(e: string) => handleUpdateRuleset('country', e)}
							label="Group"
						/>
					</div>
					{!isEdit && (
						<div className={styles.col}>
							<Input
								label="Rule Status"
								radiobtns={status_types}
								selected={currentRuleset.status}
								type="radio"
								onChange={(e: any) => handleUpdateRuleset('status', e.target.value)}
							/>
						</div>
					)}
				</div>
			</div>

			<Textarea
				label="Ruleset Description"
				value={currentRuleset.description}
				onChange={(e: any) => handleUpdateRuleset('description', e.target.value)}
			/>
			<div className={styles.modal_btns}>
				<Button color={ButtonColors.secondary} onClick={handleToggle}>
					Cancel
				</Button>
				<Button color={ButtonColors.primary} onClick={handleAddRuleset}>
					{isEdit ? 'Save Changes' : 'Add Ruleset'}
				</Button>
			</div>
		</Modal>
	);
};

export default AddRuleset;
