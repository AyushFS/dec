import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Popup from './Popup';

describe('Popup component', () => {
	const renderPopup = (props?: any) => {
		const { showPopup, popupContent, ...restProps } = props || { showPopup: true };
		return render(
			<Popup showPopup={showPopup} {...restProps}>
				{popupContent}
			</Popup>
		);
	};

	test('should render Popup component properly', () => {
		renderPopup({
			showPopup: true,
			popupContent: <div>Dummy Content</div>,
			popupTitle: 'Dummy Title',
		});
		expect(screen.getByTestId('popup-component')).toBeInTheDocument();
		expect(screen.getByTestId('popup-content-component')).toBeInTheDocument();
		expect(screen.getByText('Dummy Title')).toBeInTheDocument();
	});

	test('should not render Popup component properly when popup content is not provided', () => {
		renderPopup();
		expect(screen.getByTestId('popup-component')).toBeInTheDocument();
		expect(screen.queryByTestId('popup-content-component')).not.toBeInTheDocument();
	});

	test('should toggle popup when clicked on popup title', () => {
		renderPopup({
			showPopup: false,
			popupContent: <div>Dummy Content</div>,
			popupTitle: 'Dummy Title',
		});
		expect(screen.getByTestId('popup-component')).toBeInTheDocument();
		expect(screen.queryByTestId('popup-content-component')).not.toBeInTheDocument();
		fireEvent.click(screen.getByText('Dummy Title'));
		expect(screen.getByTestId('popup-content-component')).toBeInTheDocument();
		fireEvent.click(screen.getByText('Dummy Title'));
		expect(screen.queryByTestId('popup-content-component')).not.toBeInTheDocument();
	});

	test('should call onChangeState callback when popup state is toggled', () => {
		const onChangePopupStateMock = jest.fn();
		renderPopup({
			showPopup: false,
			popupContent: <div>Dummy Content</div>,
			popupTitle: 'Dummy Title',
			onChangePopupState: onChangePopupStateMock,
		});
		expect(screen.getByTestId('popup-component')).toBeInTheDocument();
		expect(screen.queryByTestId('popup-content-component')).not.toBeInTheDocument();
		fireEvent.click(screen.getByText('Dummy Title'));
		expect(screen.getByTestId('popup-content-component')).toBeInTheDocument();
		expect(onChangePopupStateMock).toHaveBeenCalledWith(true);
	});
});
