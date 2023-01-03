import React, { useEffect } from 'react';
import { ReactFCC } from '../../common/interface/react';
import useGlobalState from '../../features/GlobalState/useGlobalState';

interface RouteWrapperProps {
	route?: any;
}

const RouteWrapper: ReactFCC<RouteWrapperProps> = (props) => {
	const { pageData, setPageData } = useGlobalState();
	useEffect(() => {
		if (pageData.title !== props.route.title) {
			setPageData(props.route);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.route]);
	// eslint-disable-next-line react/jsx-no-useless-fragment
	return <>{props.children}</>;
};

export default RouteWrapper;
