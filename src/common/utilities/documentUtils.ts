import { downloadDocById } from '../services/Docs.service';

export const downloadFile = (blob: Blob, fileName: string) => {
	const url = window.URL.createObjectURL(blob);
	const downloadLink = document.createElement('a');
	downloadLink.href = url;
	downloadLink.download = fileName;
	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
	window.URL.revokeObjectURL(url);
};

export const viewFile = (blob: Blob) => {
	const url = window.URL.createObjectURL(blob);
	window.open(url, '_blank');
	window.URL.revokeObjectURL(url);
};

export const getFileBlobById = async (dmsId: number) => {
	const fileData = await downloadDocById(dmsId);
	return new Blob([fileData], { type: 'application/pdf' });
};
