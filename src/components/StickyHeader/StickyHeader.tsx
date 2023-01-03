import React from 'react';
import { ReactFCC } from '../../common/interface/react';
import styles from './StickyHeader.module.scss';

interface StickyHeaderProps {}

const StickyHeader: ReactFCC<StickyHeaderProps> = ({ children }) => {
	return (
		<div className={styles.StickyHeader} data-testid="sticky-header-component">
			{children}
		</div>
	);
};

export default StickyHeader;
