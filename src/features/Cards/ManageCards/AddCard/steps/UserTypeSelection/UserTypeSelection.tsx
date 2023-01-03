import React, { FC, memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../../../../components/Modal';
import { UserTypeSelectionProps } from './interface';
import useGlobalState from '../../../../../GlobalState/useGlobalState';
import UserTypeSelectionContent from './UserTypeSelectionContent/UserTypeSelectionContent';
import { ADD_CARD_STEPS, USER_TYPES } from '../../constants';

const UserTypeSelection: FC<UserTypeSelectionProps> = memo(({ onClose }) => {
	const { isMobile } = useGlobalState();
	const [openState, setOpenState] = useState<boolean>(true);
	const [userType, setUserType] = useState(USER_TYPES.NEW_USER);
	const history = useNavigate();

	const onFlowClose = useCallback(() => {
		setOpenState(false);
		if (onClose) onClose();
	}, [onClose]);

	const onChangeSelectedUser = useCallback((selectedUserType: USER_TYPES) => {
		setUserType(selectedUserType);
	}, []);

	const onContinue = useCallback(() => {
		history(
			`add-card/${
				userType === USER_TYPES.EXISTING_USER ? ADD_CARD_STEPS.SELECT_EXISTING_USER : ADD_CARD_STEPS.USER_DETAILS_FORM
			}`
		);
	}, [history, userType]);

	const userSelectionTypeComponent = (
		<UserTypeSelectionContent
			isMobile={isMobile}
			onClose={onFlowClose}
			selectedUserType={userType}
			onChangeSelectedUser={onChangeSelectedUser}
			onContinue={onContinue}
		/>
	);

	return isMobile ? userSelectionTypeComponent : <Modal openState={openState}>{userSelectionTypeComponent}</Modal>;
});

export default UserTypeSelection;
