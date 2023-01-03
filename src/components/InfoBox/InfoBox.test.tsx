import React from 'react';
import { render, screen } from '@testing-library/react';
import InfoBox from './InfoBox';

describe('InfoBox component', () => {
	test('renders InfoBox component', () => {
		render(<InfoBox title="title" />);
		expect(screen.getByTestId('info-box-component')).toBeInTheDocument();
	});

	test('renders InfoBox component with title', () => {
		render(<InfoBox title="title" />);
		expect(screen.getByText('title')).toBeInTheDocument();
	});

	test('renders InfoBox component with children', () => {
		render(<InfoBox title="title">children</InfoBox>);
		expect(screen.getByText('children')).toBeInTheDocument();
	});

	test('renders InfoBox component with icon', () => {
		render(<InfoBox title="title" />);
		expect(screen.getByTestId('fs-icon')).toBeInTheDocument();
	});

	test('renders InfoBox component icon with default size', () => {
		render(<InfoBox title="title" />);
		expect(screen.getByTestId('fs-icon')).toHaveStyle('width: 20px; height: 20px;');
	});

	test('renders InfoBox component icon with custom size', () => {
		render(<InfoBox title="title" iconSize={16} />);
		expect(screen.getByTestId('fs-icon')).toHaveStyle('width: 16px; height: 16px;');
	});

	test('renders InfoBox component without any size', () => {
		render(<InfoBox title="title" />);
		expect(screen.getByTestId('info-box-component')).not.toHaveClass('InfoBox--size_small');
	});

	test('renders InfoBox component with small size', () => {
		render(<InfoBox title="title" size="small" />);
		expect(screen.getByTestId('info-box-component')).toHaveClass('InfoBox--size_small');
	});

	test('renders InfoBox component with custom icon', () => {
		render(<InfoBox title="title" icon={<svg data-testid="sample-icon" />} />);
		expect(screen.getByTestId('sample-icon')).toBeInTheDocument();
	});

	test('renders InfoBox component without icon', () => {
		render(<InfoBox title="title" hasIcon={false} />);
		expect(screen.queryByTestId('fs-icon')).not.toBeInTheDocument();
	});

	['primary', 'primary-light', 'success', 'warning', 'warning-light', 'error'].forEach((type: any) => {
		test(`renders InfoBox component with type ${type}`, () => {
			render(<InfoBox title="title" type={type} />);
			expect(screen.getByTestId('info-box-component')).toHaveClass(`InfoBox--${type}`);
		});
	});

	test('render borderless InfoBox component', () => {
		render(<InfoBox title="title" borderless />);
		expect(screen.getByTestId('info-box-component')).toHaveClass('InfoBox--borderless');
	});
});
