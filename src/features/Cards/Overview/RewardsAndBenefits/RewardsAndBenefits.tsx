import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { ReactFCC } from '../../../../common/interface/react';
import useGlobalState from '../../../GlobalState/useGlobalState';
import SectionHeader from '../SectionHeader';
import { rewardsLinksByCountry } from './constants';
import styles from './RewardsAndBenefits.module.scss';

export interface Banner {
	id: string;
	image: string;
	subtitle: string;
	title: string;
}

interface RewardsAndBenefitsProps {}

const RewardsAndBenefits: ReactFCC<RewardsAndBenefitsProps> = () => {
	const { t } = useTranslation();
	const { currentCountry } = useGlobalState();
	const { ccAppRewardsBanner } = useFlags();
	const banners = ccAppRewardsBanner?.[currentCountry];
	const onLinkClickHandler = useCallback(() => {
		window.open((rewardsLinksByCountry as any)[currentCountry], '_blank');
	}, [currentCountry]);

	if (!banners?.length) return null;

	return (
		<div className={styles.rewardsAndBenefits} data-testid="rewards-and-benefits-component">
			<SectionHeader
				title={t('overview.rewards.rewards_n_benefits')}
				linkText={t('overview.rewards.view_all_rewards')}
				onLinkClick={onLinkClickHandler}
			/>
			<div className={styles.banners}>
				{banners.map((banner: Banner) => (
					<div key={banner.id} className={styles.banner}>
						<div className={styles.bannerImage}>
							<img src={banner.image} alt={banner.title} />
						</div>
						<div className={styles.bannerContent}>
							<div className={styles.title}>{banner.title}</div>
							<div className={styles.desc}>{banner.subtitle}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default RewardsAndBenefits;
