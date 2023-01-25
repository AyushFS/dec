import React from 'react';
import { ReactFCC } from '../../../../../common/interface/react';
import { Ruleset } from '../../../../../common/interface/ruleset';
import styles from './Content.module.scss';

interface ContentProps {
	ruleset: Ruleset;
}

const Content: ReactFCC<ContentProps> = ({ ruleset }) => {
	return (
		<div className={styles.left_section}>
			<div className={styles.head}>
				<div className={styles.name}>{ruleset.ruleset_name}</div>
				<div className={styles.description}>{ruleset.description}</div>
			</div>
			<div className={styles.text}>
				{ruleset.id} <span className={styles.divider}>|</span> {ruleset.country}
			</div>
			<div className={styles.text}>
				<span>No. of Rules </span>
				{ruleset.rules.length}
			</div>
			<div className={styles.text}>
				<span>Version</span> {ruleset.version}
			</div>
			<div className={styles.text}>
				<span>Created By</span> {ruleset.creator} on {ruleset.created_on}
			</div>
			<div className={styles.text}>
				<span>Last Updated By</span> {ruleset.creator} on {ruleset.updated_on}
			</div>
		</div>
	);
};

export default Content;
