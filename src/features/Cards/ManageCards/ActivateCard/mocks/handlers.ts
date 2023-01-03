import { rest } from 'msw';
import environment from '../../../../../environments/environment';
import directorOptions from './fixtures/directorOptions.json';

export const BASE_URL = environment.Base_api_url;
export const getDirectors = 'api/ccs/consent/directors';
export const requestDirectorConsent = 'api/ccs/consent/directors';
export const cardUuid = '123';

const handlers = [
	rest.get(`${BASE_URL}/${getDirectors}/${cardUuid}`, (_, res, ctx) => {
		return res(
			ctx.delay(1),
			ctx.status(200),
			ctx.json({
				data: directorOptions,
			})
		);
	}),
	rest.post(`${BASE_URL}/${getDirectors}/${cardUuid}`, (_, res, ctx) => {
		return res(ctx.delay(1), ctx.status(200), ctx.json({ message: 'Added successfully' }));
	}),
];

export default handlers;
