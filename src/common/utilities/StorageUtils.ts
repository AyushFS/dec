import { STORAGE_KEY } from '../constant/enum/GeneralEnum';
import { log as logError } from '../services/error.service';

export default class StorageUtils {
	static async saveStringData(key: string, value: string) {
		try {
			await window.localStorage.setItem(key, value);
			return true;
		} catch (e) {
			console.log('Error setItem : ', e);
		}

		return false;
	}

	static async saveObjectData(key: string, value: object) {
		try {
			const jsonValue = JSON.stringify(value);
			await window.localStorage.setItem(key, jsonValue);
			return true;
		} catch (e) {
			console.log('Error setItem : ', e);
		}

		return false;
	}

	static async getSavedStringData(key: string) {
		try {
			const value = await window.localStorage.getItem(key);
			return value;
		} catch (e) {
			console.log('Error getItem : ', e);
			return null;
		}
	}

	static async removeSavedStringData(key: string) {
		try {
			return window.localStorage.removeItem(key);
		} catch (e) {
			return null;
		}
	}

	static async clean() {
		try {
			StorageUtils.removeSavedStringData(STORAGE_KEY.SECURE_INFO_PRIVATE_KEY);
			StorageUtils.removeSavedStringData(STORAGE_KEY.SECURE_INFO_PUBLIC_KEY);
		} catch (e: any) {
			logError(e);
		}
	}
}
