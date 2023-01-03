import React from 'react';
import styles from './DashboardContainer.module.scss';
import Card from '../../../../components/Card';
import Ruleset from '../Ruleset/Ruleset';
import UseDashboard from '../../UseDashboard';
import RulesetHeader from '../RulesetHeader/RulesetHeader';
import Filter from '../Filter/Filter';

const DashboardContainer = () => {
	const { rulesets } = UseDashboard();

	return (
		<div className={styles.dashboard}>
			{/* Ruleset Header section */}
			<RulesetHeader />
			{/* Filter section */}
			<Filter />
			{/* All Ruleset Cards */}
			<div className={styles.container}>
				<div className={styles.row}>
					{rulesets.length &&
						rulesets.map((ruleset: any) => (
							<div className={styles.col} key={ruleset.id}>
								<Card cardPadding={0} backgroundColor={ruleset.status === 'inactive' ? '#f1f1f2' : ''}>
									<Ruleset ruleset={ruleset} />
								</Card>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default DashboardContainer;
