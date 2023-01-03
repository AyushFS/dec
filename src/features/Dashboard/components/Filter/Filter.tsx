import React from 'react';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import Button, { ButtonColors } from '../../../../components/Button';
import styles from './Filter.module.scss';

interface FilterProps {
	rulepage?: boolean;
	openRuleDrawer?: () => void;
}

const Filter = ({ rulepage, openRuleDrawer }: FilterProps) => {
	return (
		<>
			<div className={styles.container}>
				<div className={`${styles.searchBar} ${rulepage ? styles.rightPad : ''} `}>
					<Input
						placeholder={rulepage ? 'Seach by rule ID or name' : 'Search by Ruleset ID, Description, Created by...'}
					/>
					<Button>Search</Button>
				</div>
				<div className={styles.selectSection}>
					<Select
						defaultOption={{ value: '', label: 'Filter by status' }}
						options={[
							{ value: 'active', label: 'Active' },
							{ value: 'inactive', label: 'Inactive' },
						]}
						onChange={() => {}}
					/>
				</div>
				{!rulepage && (
					<div className={styles.selectSection}>
						<Select
							defaultOption={{ value: '', label: 'Filter by Group' }}
							options={[{ value: '', label: '' }]}
							onChange={() => {}}
						/>
					</div>
				)}
				{rulepage && (
					<div className={styles.addruleBtn}>
						<Button color={ButtonColors.secondary} onClick={openRuleDrawer}>
							Add Rule
						</Button>
					</div>
				)}
			</div>
			{!rulepage && (
				<div className={styles.sortFilter}>
					<label>
						Sort by:
						<Select
							defaultOption={{ value: '', label: 'Last updated' }}
							options={[{ value: '', label: '' }]}
							onChange={() => {}}
						/>
					</label>
				</div>
			)}
		</>
	);
};

export default Filter;
