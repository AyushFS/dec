import { rest } from 'msw';
import environment from '../../../../../environments/environment';
import getCardsSuccess from './fixtures/getCardsSuccess.json';

const BASE_URL = environment.Base_api_url;
export const getCardsEndpoint = 'api/ccs/cards';

const handlers = [
	rest.get(`${BASE_URL}/${getCardsEndpoint}`, (req, res, ctx) => {
		return res(ctx.delay(1), ctx.status(200), ctx.json(getCardsSuccess));
	}),
];

export default handlers;
