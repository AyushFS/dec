export const init = ({ dsn, environment }: any) => {
	console.log(dsn, environment);
};

export const setIdentity = (rawIdentity: any) => {
	console.log(rawIdentity);
};

export const log = (error: Error, stackTrace: string = '') => {
	console.log(error, stackTrace);
};

export const clean = () => {};
