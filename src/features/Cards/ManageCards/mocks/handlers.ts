import { rest } from 'msw';
import environment from '../../../../environments/environment';
import { getCardsResponse } from './card';

export const BASE_URL = environment.Base_api_url;
export const getCards = '/api/ccs/cards';

const handlers = [
	rest.get(`${BASE_URL}${getCards}`, (_, res, ctx) => {
		return res(ctx.delay(1), ctx.status(200), ctx.json({ data: getCardsResponse }));
	}),
];

export default handlers;
