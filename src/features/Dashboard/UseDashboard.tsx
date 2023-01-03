import { useContext } from 'react';
import DashboardContext from './DashboardProvider';

const UseDashboard = () => {
	const context = useContext(DashboardContext);
	if (context === undefined) {
		throw new Error('UseDashboard must be used within a DashboardProvider');
	}
	return context;
};

export default UseDashboard;
