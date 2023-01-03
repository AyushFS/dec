import React from 'react';
import { ReactFCC } from '../../common/interface/react';
import useGlobalState from '../../features/GlobalState/useGlobalState';
import './Drawer.scss';

interface DrawerProps {
	isDrawerOpen: boolean;
	hideDrawer: () => void;
	navBarHeight?: number;
	visibleNavBar?: boolean;
	fixedDrawer?: boolean;
	hasOverlay?: boolean;
	overlayOpacity?: number;
	header?: React.ReactNode;
	content?: React.ReactNode;
	footer?: React.ReactNode;
	width?: number;
	right?: boolean;
}

const Drawer: ReactFCC<DrawerProps> = (props) => {
	const {
		children,
		isDrawerOpen,
		visibleNavBar,
		navBarHeight,
		hasOverlay,
		hideDrawer,
		header,
		content,
		footer,
		width,
		right,
	} = props;
	const { isMobile } = useGlobalState();

	const navBarHeightValue = navBarHeight || 64;
	const getTopMargin = () => {
		if (!visibleNavBar) {
			return 0;
		}
		return `${navBarHeightValue}px`;
	};
	const getDrawerWidth = () => {
		if (isMobile) {
			return '100%';
		}
		if (width) {
			return `${width}px`;
		}
		return '200px';
	};

	const drawerContentAttrs = {
		className: ['drawer-content', isMobile ? 'is-mobile' : '', !isDrawerOpen && 'drawer-content--collapsed']
			.filter(Boolean)
			.join(' '),
		'data-testid': 'drawer-content',
		style: {
			width: getDrawerWidth(),
			marginTop: getTopMargin(),
		},
	};

	const overlayAttrs = {
		className: 'drawer-overlay',
		'data-testid': 'drawer-overlay',
		onClick: () => {
			hideDrawer();
		},
		style: {
			opacity: props.overlayOpacity || 0,
			marginTop: getTopMargin(),
		},
	};

	return (
		<aside className={`app-drawer ${right ? 'alignRight' : ''}`} data-testid="drawer">
			{hasOverlay && isDrawerOpen && <div {...overlayAttrs} />}
			<div {...drawerContentAttrs}>
				{header && (
					<div className="drawer-content__header" data-testid="drawer-content-header">
						{header}
					</div>
				)}
				{content && (
					<div className="drawer-content__main" data-testid="drawer-content-main">
						{content}
					</div>
				)}
				{footer && (
					<div className="drawer-content__footer" data-testid="drawer-content-footer">
						{footer}
					</div>
				)}
				{children}
			</div>
		</aside>
	);
};

export default Drawer;
