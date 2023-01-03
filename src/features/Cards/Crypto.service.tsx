import forge from 'node-forge';
import { STORAGE_KEY } from '../../common/constant/enum/GeneralEnum';
import StorageUtils from '../../common/utilities/StorageUtils';

/**
 * Generate public/private key pair and return if does not exist.
 * Or else return existing public/private key pair.
 */
export const getPublicPrivateKeyPair = async () => {
	let privateKeyPem = await StorageUtils.getSavedStringData(STORAGE_KEY.SECURE_INFO_PRIVATE_KEY);
	let publicKeyPem = await StorageUtils.getSavedStringData(STORAGE_KEY.SECURE_INFO_PUBLIC_KEY);

	if (!publicKeyPem || !privateKeyPem) {
		const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair({ bits: 4096 }) as any;
		privateKeyPem = forge.pki.privateKeyToPem(privateKey);
		publicKeyPem = forge.pki.publicKeyToPem(publicKey);
		StorageUtils.saveStringData(STORAGE_KEY.SECURE_INFO_PRIVATE_KEY, privateKeyPem as string);
		StorageUtils.saveStringData(STORAGE_KEY.SECURE_INFO_PUBLIC_KEY, publicKeyPem as string);
	}

	return {
		privateKeyPem,
		publicKeyPem,
	};
};
/**
 * Decrypt data using private key in the storage.
 * @param data encrypted text
 */
export const decrypt = async (data: any) => {
	const privateKeyPem = await StorageUtils.getSavedStringData(STORAGE_KEY.SECURE_INFO_PRIVATE_KEY);
	if (!privateKeyPem) {
		throw new Error('no key found to decrypt');
	}

	const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
	const ctBytes = forge.util.decode64(data);
	return privateKey.decrypt(ctBytes);
};
