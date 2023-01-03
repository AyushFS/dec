import React from 'react';
import { render, screen } from '@testing-library/react';
import DownloadFileComponent from './DownloadFileComponent';
import { StatementData } from '../../features/Cards/Statements/interface';

const statement: StatementData = {
	uuid: 'uuid',
	generationYear: 2021,
	generationMonth: 1,
	dmsId: 1,
};

const mockDownloadFile = jest.fn();
const mockViewFile = jest.fn();
const mockGetFileBlobById = jest.fn();
jest.mock('../../common/utilities/documentUtils', () => ({
	downloadFile: () => mockDownloadFile(),
	viewFile: () => mockViewFile(),
	getFileBlobById: () => mockGetFileBlobById(),
}));

describe('DownloadFileComponent component', () => {
	test('renders DownloadFileComponent component', () => {
		render(<DownloadFileComponent statement={statement} />);
		expect(screen.getByTestId('download-file-component')).toBeInTheDocument();
	});

	test('should viewFile when download is clicked and forceDownloadFile is not true', async () => {
		render(<DownloadFileComponent statement={statement} />);
		await screen.getByTestId('download-file-component').click();
		expect(mockGetFileBlobById).toHaveBeenCalled();
		expect(mockViewFile).toHaveBeenCalled();
	});

	test('should viewFile when download is clicked and forceDownloadFile is true', async () => {
		render(<DownloadFileComponent statement={statement} forceDownloadFile />);
		await screen.getByTestId('download-file-component').click();
		expect(mockGetFileBlobById).toHaveBeenCalled();
		expect(mockDownloadFile).toHaveBeenCalled();
	});
});
