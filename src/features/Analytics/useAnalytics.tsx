import { useContext } from 'react';
import AnalyticsContext from './AnalyticsProvider';

const useAnalytics = () => {
	const context = useContext(AnalyticsContext);
	if (context === undefined) {
		throw new Error('useAnalytics must be used within a AnalyticsProvider');
	}
	return context;
};

export default useAnalytics;
