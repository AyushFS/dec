import React from 'react';

export interface ModalProps {
	openState: boolean;
	title?: string;
	isClosable?: boolean;
	cssClass?: string;
	footer?: React.ReactNode;
	onCloseModal?: () => void;
	extraWidth?: boolean;
}
