import { Config, Environment, EnvironmentConfig, EnvironmentProperties, EnvType } from './config';

const environmentProperties: EnvironmentProperties = {
	version: '{BUILD_VERSION}',
	production: true,
	name: 'uat',
	type: new Config(EnvType.UAT),
};

const environmentConfig: EnvironmentConfig = {
	Base_api_url: 'https://uat.fundingasiagroup.com',
	Document_EndPoint_V2: 'https://uat.fundingasiagroup.com',
	Analytics: {
		MixpanelToken: '874a09d3922afc1eff1f5da8eb884d95',
	},
	ldClientID: '6107cd77d6e1fb0eb2994d91',
	intercomAppID: 'w2vzp48t',
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
