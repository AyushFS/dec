import React from 'react';
import { ReactFCC } from '../../../../common/interface/react';
import Button from '../../../../components/Button';
import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
	title: React.ReactNode;
	linkText?: string;
	onLinkClick?: () => void;
}

const SectionHeader: ReactFCC<SectionHeaderProps> = (props) => {
	const { title, linkText, onLinkClick } = props;
	return (
		<div className={styles.SectionHeader} data-testid="section-header-component">
			<div className={styles.title}>{title} </div>
			<div className={styles.link}>
				<Button link flat onClick={onLinkClick}>
					{linkText}
				</Button>
			</div>
		</div>
	);
};

export default SectionHeader;
