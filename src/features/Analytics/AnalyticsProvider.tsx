import React, { createContext, useCallback, useMemo } from 'react';
import mixpanel from 'mixpanel-browser';
import { ReactFCC } from '../../common/interface/react';
import MixpanelEvent from './constants';
import ENVIRONMENT from '../../environments/environment';
import { loadJs } from '../../common/utilities/common';

interface AnalyticsContextType {
	trackEvent: (event: MixpanelEvent, data: any) => void;
	clean: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextType>({} as AnalyticsContextType);

interface AnalyticsProviderProps {
	mixPanelToken?: string;
}

export const AnalyticsProvider: ReactFCC<AnalyticsProviderProps> = ({ children }) => {
	const initAnalytics = useCallback(() => {
		if (!ENVIRONMENT.type?.isProd()) return;
		mixpanel.init(ENVIRONMENT.Analytics?.MixpanelToken, { debug: !ENVIRONMENT.type?.isProd() });
		loadJs('assets/js/fullstory.js');
	}, []);

	const trackEvent = useCallback(async (eventName: MixpanelEvent, eventProperties: object = {}) => {
		if (!ENVIRONMENT.type?.isProd()) return;
		mixpanel?.track(eventName, eventProperties);
	}, []);

	const clean = useCallback(() => {
		if (!ENVIRONMENT.type?.isProd()) return;
		mixpanel?.reset();
	}, []);

	const AnalyticsProviderValue = useMemo((): AnalyticsContextType => ({ trackEvent, clean }), [trackEvent, clean]);

	initAnalytics();

	return <AnalyticsContext.Provider value={AnalyticsProviderValue}>{children}</AnalyticsContext.Provider>;
};

export default AnalyticsContext;
