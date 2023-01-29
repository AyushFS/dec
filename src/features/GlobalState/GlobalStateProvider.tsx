import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { COUNTRY_CODE, DEVICE_TYPE } from '../../common/constant/enum/GeneralEnum';
import { ReactFCC } from '../../common/interface/react';
import { SnackbarProps } from '../../components/Snackbar/interface';
import { AnalyticsProvider } from '../Analytics/AnalyticsProvider';
import { AuthProvider } from '../Auth/AuthProvider';
import { MonitoringProvider } from '../Monitoring/MonitoringProvider';

interface LoaderState {
	[key: string]: boolean;
}

interface DrawerState {
	[key: string]: boolean;
}

interface PageData {
	title: string;
	[key: string]: string;
}

interface GlobalStateContextType {
	loaders: LoaderState;
	setLoader: (key: string, value: boolean) => void;
	snackbar: SnackbarProps | null;
	setSnackbar: (props: SnackbarProps | null) => void;
	isMobile: boolean;
	setDrawerOpen: Dispatch<SetStateAction<DrawerState>>;
	toggleDrawer: (key?: string) => void;
	isDrawerOpen: (key?: string) => boolean;
	currentCountry: COUNTRY_CODE;
	setCurrentCountry: (countryName: COUNTRY_CODE) => void;
	isCurrentCountry: (countryName: COUNTRY_CODE) => boolean;
	deviceType: DEVICE_TYPE;
	pageData: PageData;
	setPageData: (pageData: PageData) => void;
}

const GlobalStateContext = createContext<GlobalStateContextType>({} as GlobalStateContextType);

interface GlobalStateProviderProps {}

export const GlobalStateProvider: ReactFCC<GlobalStateProviderProps> = ({ children }) => {
	const eventListeners = useRef<any>();
	const [loaders, setLoaders] = useState<LoaderState>({});
	const [snackbar, setSnackbar] = useState<SnackbarProps | null>(null);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
	const [deviceType, setDeviceType] = useState<DEVICE_TYPE>(DEVICE_TYPE.DESKTOP);
	const [drawerOpen, setDrawerOpen] = useState<DrawerState>({ main: true, rule: false });
	const [currentCountry, setCurrentCountry] = useState<COUNTRY_CODE>(COUNTRY_CODE.SG);
	const [pageData, setPageData] = useState<PageData>({ title: '' });

	const setDevice = useCallback(() => {
		const isSmallMobile = window.innerWidth <= 544;
		const ismobile = window.innerWidth <= 768;
		const isTablet = window.innerWidth <= 1024;
		const isDesktop = window.innerWidth > 1024;
		if (isSmallMobile) {
			setDeviceType(DEVICE_TYPE.MOBILE);
		} else if (ismobile) {
			setDeviceType(DEVICE_TYPE.TABLET);
		} else if (isTablet) {
			setDeviceType(DEVICE_TYPE.LAPTOP);
		} else if (isDesktop) {
			setDeviceType(DEVICE_TYPE.DESKTOP);
		}
		if (ismobile !== isMobile) setIsMobile(ismobile);

		if (ismobile) setDrawerOpen((prev) => ({ ...prev, main: false }));
	}, [isMobile, setIsMobile]);

	const isCurrentCountry = useCallback(
		(countryName: COUNTRY_CODE) => {
			return currentCountry === countryName;
		},
		[currentCountry]
	);

	useEffect(() => {
		setDevice();
		eventListeners.current = setDevice;
		window.addEventListener('resize', eventListeners.current, true);
		return () => window.removeEventListener('resize', eventListeners.current, true);
	}, [setDevice]);

	useEffect(() => {
		if (pageData.title) {
			document.title = `Rule Engine - ${pageData.title}`;
		}
	}, [pageData]);

	const toggleDrawer = useCallback(
		(key?: string) => {
			const drawerKey = key || 'main';
			setDrawerOpen((prev) => ({ ...prev, [drawerKey]: !prev[drawerKey] }));
		},
		[setDrawerOpen]
	);

	const isDrawerOpen = useCallback(
		(key?: string) => {
			const drawerKey = key || 'main';
			return drawerOpen[drawerKey];
		},
		[drawerOpen]
	);

	const setLoader = useCallback((key: string, value: boolean) => {
		setLoaders((prevState) => ({ ...prevState, [key]: value }));
	}, []);

	const GlobalStateProviderValue = useMemo(
		(): GlobalStateContextType => ({
			loaders,
			setLoader,
			snackbar,
			setSnackbar,
			isMobile,
			toggleDrawer,
			setDrawerOpen,
			isDrawerOpen,
			currentCountry,
			setCurrentCountry,
			isCurrentCountry,
			deviceType,
			pageData,
			setPageData,
		}),
		[
			loaders,
			setLoader,
			snackbar,
			setSnackbar,
			isMobile,
			toggleDrawer,
			setDrawerOpen,
			isDrawerOpen,
			currentCountry,
			setCurrentCountry,
			isCurrentCountry,
			deviceType,
			pageData,
			setPageData,
		]
	);

	return (
		<GlobalStateContext.Provider value={GlobalStateProviderValue}>
			<MonitoringProvider>
				<AnalyticsProvider>
					<AuthProvider>{children}</AuthProvider>
				</AnalyticsProvider>
			</MonitoringProvider>
		</GlobalStateContext.Provider>
	);
};

export default GlobalStateContext;
