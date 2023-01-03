import { rest } from 'msw';
import environment from '../../../../environments/environment';
import resendOtpSuccess from './fixtures/resendOtpSuccess.json';
import verifyOtpSuccess from './fixtures/verifyOtpSuccess.json';

export const BASE_URL = environment.Base_api_url;
export const resendOtpEndpoint = 'mobile_login/scfs/2fa/resend';
export const verifyOtpEndpoint = 'mobile_login/oauth/token';

const handlers = [
	rest.post(`${BASE_URL}/${verifyOtpEndpoint}`, (req, res, ctx) => {
		return res(ctx.delay(1), ctx.status(200), ctx.json(verifyOtpSuccess));
	}),
	rest.get(`${BASE_URL}/${resendOtpEndpoint}`, (req, res, ctx) => {
		return res(ctx.delay(1), ctx.status(200), ctx.json(resendOtpSuccess));
	}),
];

export default handlers;
