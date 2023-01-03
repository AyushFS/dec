import React from 'react';
import { ReactFCC } from '../../common/interface/react';
import Header from '../../components/Header';
import './AppContent.scss';
import useGlobalState from '../../features/GlobalState/useGlobalState';

interface AppContentProps {
	isDrawerOpen: boolean;
	visibleNavBar?: boolean;
	fixedDrawer?: boolean;
	sidebarWidth?: number;
}

const AppContent: ReactFCC<AppContentProps> = ({
	children,
	isDrawerOpen,
	visibleNavBar,
	sidebarWidth,
	fixedDrawer,
}) => {
	const { isDrawerOpen: isRuleDrawerOpen } = useGlobalState();
	sidebarWidth = sidebarWidth || 240;
	const getAppContentMarginLeft = () => {
		if (fixedDrawer) {
			return 0;
		}
		if (visibleNavBar) {
			return 0;
		}
		if (!isDrawerOpen) {
			return 0;
		}
		return `${sidebarWidth}px`;
	};
	const getMainMarginLeft = () => {
		if (fixedDrawer) {
			return 0;
		}
		if (!visibleNavBar) {
			return 0;
		}
		if (!isDrawerOpen) {
			return 0;
		}
		return `${sidebarWidth}px`;
	};
	const getMainMarginRight = () => {
		if (isRuleDrawerOpen('rule')) {
			return `${(window.innerWidth - 200) / 2}px`;
		}
		return 0;
	};

	const contentAttrs = {
		className: 'app-content',
		style: {
			marginLeft: getAppContentMarginLeft(),
		},
	};
	const mainAttrs = {
		className: 'main',
		style: {
			marginLeft: getMainMarginLeft(),
			marginRight: getMainMarginRight(),
		},
		'data-testid': 'main',
	};
	return (
		<div {...contentAttrs} data-testid="app-content">
			<Header />
			<div {...mainAttrs}>{children}</div>
		</div>
	);
};

export default AppContent;
