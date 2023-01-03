export const setLocalStorage = (key: string, value: string): void => {
	const bearerTokenValue = value;
	localStorage.setItem(key, bearerTokenValue);
};
export const getLocalStorage = (key: string): string | null => {
	return localStorage.getItem(key);
};
export const removeLocalStorage = (key: string): void => {
	localStorage.removeItem(key);
};
