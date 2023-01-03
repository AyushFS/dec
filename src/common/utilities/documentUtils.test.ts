import { downloadFile, viewFile, getFileBlobById } from './documentUtils';

const mockBlob = new Blob([''], { type: 'application/pdf' });
const mockCreateObjectURL = jest.fn().mockReturnValue('url');
const mockRevokeObjectURL = jest.fn();
const mockOpen = jest.fn();
const mockAppendChild = jest.fn();
const mockRemoveChild = jest.fn();

const fileData = 'test';
const mockDownloadDocById = jest.fn().mockReturnValue(fileData);
jest.mock('../services/Docs.service', () => ({
	downloadDocById: () => new Promise((res) => res(mockDownloadDocById())),
}));

describe('documentUtils', () => {
	beforeEach(() => {
		window.URL.createObjectURL = mockCreateObjectURL;
		window.URL.revokeObjectURL = mockRevokeObjectURL;
		window.open = mockOpen;
		document.body.appendChild = mockAppendChild;
		document.body.removeChild = mockRemoveChild;
	});

	afterEach(() => {
		(window.URL.createObjectURL as any).mockReset();
		(window.URL.revokeObjectURL as any).mockReset();
		(window.open as any).mockReset();
		(document.body.appendChild as any).mockReset();
		(document.body.removeChild as any).mockReset();
	});

	describe('downloadFile', () => {
		it('should download a file', () => {
			const fileName = 'test.pdf';
			downloadFile(mockBlob, fileName);
			expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob);
			expect(mockAppendChild).toHaveBeenCalled();
			expect(mockRemoveChild).toHaveBeenCalled();
			expect(mockRevokeObjectURL).toHaveBeenCalled();
		});
	});

	describe('viewFile', () => {
		it('should view a file', () => {
			viewFile(mockBlob);
			expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob);
			expect(mockOpen).toHaveBeenCalled();
			expect(mockRevokeObjectURL).toHaveBeenCalled();
		});
	});

	describe('getFileBlobById', () => {
		it('should return a file blob', () => {
			const fileBlob = new Blob([fileData], { type: 'application/pdf' });

			const result = getFileBlobById(1);
			expect(result).resolves.toEqual(fileBlob);
			expect(mockDownloadDocById).toHaveBeenCalled();
		});
	});
});
