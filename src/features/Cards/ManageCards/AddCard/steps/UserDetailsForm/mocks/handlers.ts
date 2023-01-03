import { rest } from 'msw';
import environment from '../../../../../../../environments/environment';

export const BASE_URL = environment.Base_api_url;
export const getNationalities = 'api/ccs/enums/nationalities';

const handlers = [
	rest.get(`${BASE_URL}/${getNationalities}`, (req, res, ctx) => {
		return res(ctx.delay(1), ctx.status(200), ctx.json({ data: [{ code: 'Singaporean' }] }));
	}),
	rest.get(`http://localhost/locales/en-US/translation.json`, (req, res, ctx) => {
		return res(ctx.delay(1), ctx.status(200), ctx.json({}));
	}),
	rest.get(`http://localhost/locales/en/translation.json`, (req, res, ctx) => {
		return res(ctx.delay(1), ctx.status(200), ctx.json({}));
	}),
];

export default handlers;
