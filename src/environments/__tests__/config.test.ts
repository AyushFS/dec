import { Config, EnvType } from '../config';

describe('Environment Config Class', () => {
	it('should return true if environment is production', () => {
		const config = new Config(EnvType.PROD);
		expect(config.isProd()).toBe(true);
	});

	it('should return false if environment is not production', () => {
		const config = new Config(EnvType.STAGING);
		expect(config.isProd()).toBe(false);
	});

	it('should return true if environment is staging', () => {
		const config = new Config(EnvType.STAGING);
		expect(config.isStaging()).toBe(true);
	});

	it('should return false if environment is not staging', () => {
		const config = new Config(EnvType.PROD);
		expect(config.isStaging()).toBe(false);
	});

	it('should return true if environment is uat', () => {
		const config = new Config(EnvType.UAT);
		expect(config.isUAT()).toBe(true);
	});

	it('should return false if environment is not uat', () => {
		const config = new Config(EnvType.PROD);
		expect(config.isUAT()).toBe(false);
	});
});
