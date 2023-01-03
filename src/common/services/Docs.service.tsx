import environment from '../../environments/environment';
import { sendGet } from '../../services/Http.service';

const ADDRESS_DMS = environment.Document_EndPoint_V2;
const API_PREFIX = 'api/docs_management/v2';

export const downloadDocById = async (docId: number): Promise<ArrayBuffer> => {
	const endpoint = `${API_PREFIX}/download?id=${docId.toString()}`;
	const response = await sendGet(endpoint, { responseType: 'arraybuffer' }, {}, ADDRESS_DMS);
	const responseData: ArrayBuffer = response?.data;
	return responseData;
};

export default { downloadDocById };
