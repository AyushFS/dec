import { rest } from 'msw';
import environment from '../../../../../environments/environment';
import getTransactionsResponse from './transactions';

export const BASE_URL = environment.Base_api_url;
export const getTransactionsEndpoint = '/api/ccs/transactions';

const handlers = [
	rest.get(`${BASE_URL}${getTransactionsEndpoint}`, (_, res, ctx) => {
		return res(ctx.delay(1), ctx.status(200), ctx.json({ data: getTransactionsResponse }));
	}),
];

export default handlers;
