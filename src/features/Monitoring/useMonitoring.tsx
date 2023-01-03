import { useContext } from 'react';
import MonitoringContext from './MonitoringProvider';

const useMonitoring = () => {
	const context = useContext(MonitoringContext);
	if (context === undefined) {
		throw new Error('useMonitoring must be used within a MonitoringProvider');
	}
	return context;
};

export default useMonitoring;
