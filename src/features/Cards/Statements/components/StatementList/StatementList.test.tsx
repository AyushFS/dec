import React from 'react';
import { render, screen } from '@testing-library/react';
import StatementList from './StatementList';
import { StatementData } from '../../interface';

jest.mock('../EmptyStatements', () => () => <div data-testid="empty-statements-component" />);
jest.mock('../../../../../components/DownloadFileComponent', () => () => <div data-testid="download-file-component" />);

const statements: StatementData[] = [
	{
		uuid: 'uuid2',
		generationYear: 2021,
		generationMonth: 2,
		dmsId: 2,
	},
	{
		uuid: 'uuid1',
		generationYear: 2021,
		generationMonth: 1,
		dmsId: 1,
	},
];

describe('StatementList component', () => {
	test('renders StatementList component', () => {
		render(<StatementList statements={statements} />);
		expect(screen.getByTestId('statement-list-component')).toBeInTheDocument();
	});

	test('should render EmptyStatements component when there is no statements', () => {
		render(<StatementList statements={[]} />);
		expect(screen.getByTestId('empty-statements-component')).toBeInTheDocument();
	});

	test('should not render EmptyStatements component when statements exist', () => {
		render(<StatementList statements={statements} />);
		expect(screen.queryByTestId('empty-statements-component')).not.toBeInTheDocument();
	});

	test('should render DownloadFileComponent component when statements exist', () => {
		render(<StatementList statements={statements} />);
		expect(screen.getAllByTestId('download-file-component').length).toBe(4);
	});

	test('should not render DownloadFileComponent component when there is no statements', () => {
		render(<StatementList statements={[]} />);
		expect(screen.queryByTestId('download-file-component')).not.toBeInTheDocument();
	});
});
