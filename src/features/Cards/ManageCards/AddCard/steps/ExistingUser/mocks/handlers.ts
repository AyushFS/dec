import { rest } from 'msw';
import environment from '../../../../../../../environments/environment';
import existingUserData from './testdata';

export const BASE_URL = environment.Base_api_url;
export const getUsers = 'api/ccs/users';

const handlers = [
	rest.get(`${BASE_URL}/${getUsers}`, (_, res, ctx) => {
		return res(
			ctx.delay(1),
			ctx.status(200),
			ctx.json({
				data: existingUserData,
			})
		);
	}),
];

export default handlers;
