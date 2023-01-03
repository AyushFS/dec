import { rest } from 'msw';
import environment from '../../../../../../../environments/environment';

export const BASE_URL = environment.Base_api_url;
export const getSpendPurposes = 'api/ccs/enums/spend_purpose';
export const addCard = 'api/ccs/sub/card';
export const getCards = 'api/ccs/cards';

const handlers = [
	rest.get(`${BASE_URL}/${getSpendPurposes}`, (_, res, ctx) => {
		return res(ctx.delay(1), ctx.status(200), ctx.json({ data: [{ uuid: 'test-uuid', value: 'test-label' }] }));
	}),
	rest.post(`${BASE_URL}/${addCard}`, (_, res, ctx) => {
		return res(ctx.delay(1), ctx.status(200), ctx.json({ message: 'Card successfully added' }));
	}),
	rest.get(`${BASE_URL}/${getCards}`, (_, res, ctx) => {
		return res(ctx.delay(1), ctx.status(200), ctx.json({}));
	}),
	rest.get(`http://localhost/locales/en-US/translation.json`, (_, res, ctx) => {
		return res(ctx.delay(1), ctx.status(200), ctx.json({}));
	}),
	rest.get(`http://localhost/locales/en/translation.json`, (_, res, ctx) => {
		return res(ctx.delay(1), ctx.status(200), ctx.json({}));
	}),
];

export default handlers;
