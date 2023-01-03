import React from 'react';
import { ReactFCC } from '../../../../common/interface/react';
import FsIcon from '../../../../components/FsIcon';
import { IconTypes } from '../../../../components/FsIcon/constants';

interface StatusMsgProps {
	classes: string;
	size: number;
	title: string;
	icon: React.ReactNode;
}

const StatusMsg: ReactFCC<StatusMsgProps> = (props) => {
	const { classes, size, icon, title } = props;
	return (
		<span className={['card-list-item__status_icon', classes].join(' ')} data-testid="status-msg-component">
			<FsIcon type={IconTypes.svg} size={size}>
				{icon}
			</FsIcon>
			<span>{title}</span>
		</span>
	);
};

export default StatusMsg;
