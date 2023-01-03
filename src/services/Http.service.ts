import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import environment from '../environments/environment';
import { getLocalStorage } from './Localstorage.service';

const BASE_URL = environment.Base_api_url;

const addDefaultConfig = () => {
	axios.interceptors.response.use(
		(successRes) => {
			return successRes;
		},
		async (error) => {
			// const originalRequest = error.config;
			// console.log(`Orignal Request :`, JSON.parse(JSON.stringify(originalRequest)));
			const accessToken = getLocalStorage('bearerToken') as string;
			if (error.response?.status === 401 && accessToken?.length > 0) {
				console.log('401 error');
			}
			// if (error.response?.status === 403 && !originalRequest.retry) {
			//   originalRequest.retry = true;
			//   const refreshResponse = await refreshToken();
			//   if (refreshResponse.data) {
			//     return axios.request(originalRequest);
			//   }
			// }
			return Promise.reject(error);
		}
	);

	axios.interceptors.request.use(
		(config: AxiosRequestConfig) => {
			const accessToken = getLocalStorage('bearerToken') as string;
			if (accessToken) {
				if (config.method !== 'OPTIONS') {
					config.headers = {
						Authorization: `Bearer ${accessToken}`,
						...config.headers, // this will override the old access token with new if any in config
						'Content-Type': 'application/json',
					};
				}
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);
};

export const sendGet = async (
	endpoint: string,
	config?: AxiosRequestConfig,
	headers?: AxiosRequestHeaders,
	baseUrl?: string
) => {
	return (await axios.get(`${baseUrl || BASE_URL}/${endpoint}`, {
		...config,
		headers: {
			...headers,
		},
	})) as AxiosResponse<any>;
};

export const sendPost = async (
	endpoint: string,
	body?: any,
	config?: AxiosRequestConfig,
	headers?: AxiosRequestHeaders,
	baseUrl?: string
) => {
	return (await axios.post(`${baseUrl || BASE_URL}/${endpoint}`, body, {
		...config,
		headers: {
			...headers,
		},
	})) as AxiosResponse<any>;
};

export const sendPut = async (
	endpoint: string,
	body?: any,
	config?: AxiosRequestConfig,
	headers?: AxiosRequestHeaders,
	baseUrl?: string
) => {
	return (await axios.put(`${baseUrl || BASE_URL}/${endpoint}`, body, {
		...config,
		headers: {
			...headers,
		},
	})) as AxiosResponse<any>;
};

export const sendDelete = async (
	endpoint: string,
	config?: AxiosRequestConfig,
	headers?: AxiosRequestHeaders,
	baseUrl?: string
) => {
	return (await axios.delete(`${baseUrl || BASE_URL}/${endpoint}`, {
		...config,
		headers: {
			...headers,
		},
	})) as AxiosResponse<any>;
};

addDefaultConfig();
