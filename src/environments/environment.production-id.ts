import { Config, Environment, EnvironmentConfig, EnvironmentProperties, EnvType } from './config';

const environmentProperties: EnvironmentProperties = {
	version: '{BUILD_VERSION}',
	production: true,
	name: 'Live',
	type: new Config(EnvType.PROD),
};

const environmentConfig: EnvironmentConfig = {
	Base_api_url: 'https://uat.fundingasiagroup.com',
	Document_EndPoint_V2: 'https://uat.fundingasiagroup.com',
	Analytics: {
		MixpanelToken: '4bffe5382bb6142e7e94c35bd22f7f3b',
	},
	ldClientID: '6107ccef978a2f283aea8c24',
	intercomAppID: 'pqkn8tj3',
	datadog: {
		applicationId: '68823d04-fb72-4b62-8fc3-d47248cde905',
		clientToken: 'pub310c1e112cfd88385ebcb45ab74c98ba',
		service: 'elevate-web',
	},
};

const environment: Environment = {
	...environmentProperties,
	...environmentConfig,
};

export default environment;
