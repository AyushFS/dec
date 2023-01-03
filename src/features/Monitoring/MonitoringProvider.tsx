import React, { createContext, useCallback, useMemo } from 'react';
import { datadogRum } from '@datadog/browser-rum';
import { ReactFCC } from '../../common/interface/react';
import ENVIRONMENT from '../../environments/environment';

interface MonitoringContextType {
	initDatadog: () => void;
}

const MonitoringContext = createContext<MonitoringContextType>({} as MonitoringContextType);

interface MonitoringProviderProps {}

export const MonitoringProvider: ReactFCC<MonitoringProviderProps> = ({ children }) => {
	const initDatadog = useCallback(() => {
		if (!ENVIRONMENT.datadog) return;
		datadogRum.init({
			applicationId: ENVIRONMENT.datadog.applicationId,
			clientToken: ENVIRONMENT.datadog.clientToken,
			site: 'datadoghq.com',
			service: ENVIRONMENT.datadog.service,
			env: ENVIRONMENT.name,
			version: ENVIRONMENT.version,
			sampleRate: 100,
			premiumSampleRate: 100,
			trackInteractions: true,
			silentMultipleInit: true,
			defaultPrivacyLevel: 'mask-user-input',
		});
		datadogRum.startSessionReplayRecording();
	}, []);

	const MonitoringProviderValue = useMemo((): MonitoringContextType => ({ initDatadog }), [initDatadog]);

	return <MonitoringContext.Provider value={MonitoringProviderValue}>{children}</MonitoringContext.Provider>;
};

export default MonitoringContext;
