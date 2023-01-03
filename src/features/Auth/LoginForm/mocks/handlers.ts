import { rest } from 'msw';
import environment from '../../../../environments/environment';
import publicKeySuceess from './fixtures/publicKeySuceess.json';

export const BASE_URL = environment.Base_api_url;
export const publicKeyEndpoint = 'api/v2/security/public_key';

const handlers = [
	rest.get(`${BASE_URL}/${publicKeyEndpoint}`, (req, res, ctx) => {
		return res(ctx.delay(1), ctx.status(200), ctx.json(publicKeySuceess));
	}),
];

export default handlers;
