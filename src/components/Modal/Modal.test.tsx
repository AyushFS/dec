import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';
import { ModalProps } from './interface';

describe('Modal component', () => {
	const renderModal = (props?: ModalProps) => {
		const { openState = true, ...restProps } = props || { openState: true };
		return render(
			<Modal openState={openState} {...restProps}>
				<div>Modal content</div>
			</Modal>
		);
	};

	test('should render modal component properly', () => {
		renderModal({
			openState: true,
			title: 'Modal title',
			isClosable: true,
			footer: <div>Dummy Footer</div>,
		});
		expect(screen.getByTestId('modal-component')).toBeInTheDocument();
		expect(screen.getByText('Modal title')).toBeInTheDocument();
		expect(screen.getByText('Modal content')).toBeInTheDocument();
		expect(screen.getByText('Dummy Footer')).toBeInTheDocument();
		expect(screen.getByTestId('fs-icon')).toHaveClass('fs-icon--cross');
	});

	test('should not render modal component openState is false', () => {
		renderModal({
			openState: false,
			title: 'Modal title',
		});
		expect(screen.queryByTestId('modal-component')).not.toBeInTheDocument();
		expect(screen.queryByText('Modal title')).not.toBeInTheDocument();
	});

	test('should render modal header with only close icon if modal is closable', () => {
		renderModal({
			openState: true,
			isClosable: true,
		});
		expect(screen.getByTestId('fs-icon')).toHaveClass('fs-icon--cross');
	});

	test('should close modal on click of close icon', () => {
		renderModal({
			openState: true,
			isClosable: true,
		});
		expect(screen.getByTestId('modal-component')).toBeInTheDocument();
		expect(screen.getByTestId('fs-icon')).toHaveClass('fs-icon--cross');
		userEvent.click(screen.getByTestId('fs-icon'));
		expect(screen.queryByTestId('modal-component')).not.toBeInTheDocument();
	});

	test('should call onCloseModal callback if modal is close by clicking on close icon', () => {
		const onCloseModalCallbackFn = jest.fn();
		renderModal({
			openState: true,
			isClosable: true,
			onCloseModal: onCloseModalCallbackFn,
		});
		expect(screen.getByTestId('modal-component')).toBeInTheDocument();
		expect(screen.getByTestId('fs-icon')).toHaveClass('fs-icon--cross');
		userEvent.click(screen.getByTestId('fs-icon'));
		expect(screen.queryByTestId('modal-component')).not.toBeInTheDocument();
		expect(onCloseModalCallbackFn).toHaveBeenCalled();
	});

	test('should add custom class to modal component', () => {
		renderModal({
			openState: true,
			cssClass: 'custom-class',
		});
		expect(screen.getByTestId('modal-component')).toHaveClass('custom-class');
	});
});
