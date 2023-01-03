export interface RouteConfig {
	title: string;
	path: string;
	element: any;
	requireAuth: boolean;
	icon?: any;
	isInSideMenu?: boolean;
	isOnTopMenu?: boolean;
	isInSideMenuFooter?: boolean;
	children?: { [key: string]: RouteConfig };
}
