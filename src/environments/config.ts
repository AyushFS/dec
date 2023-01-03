export enum EnvType {
	STAGING = 'staging',
	UAT = 'uat',
	PROD = 'prod',
}

export class Config {
	readonly type: EnvType;

	constructor(type: EnvType) {
		this.type = type;
	}

	isStaging(): boolean {
		return this.type === EnvType.STAGING;
	}

	isUAT(): boolean {
		return this.type === EnvType.UAT;
	}

	isProd(): boolean {
		return this.type === EnvType.PROD;
	}
}

export interface EnvironmentProperties {
	version: string;
	production: boolean;
	name: string;
	type: Config;
}

export interface EnvironmentConfig {
	Base_api_url: string;
	Document_EndPoint_V2: string;
	Analytics: {
		MixpanelToken: string;
	};
	ldClientID: string;
	intercomAppID: string;
	datadog?: {
		applicationId: string;
		clientToken: string;
		service: string;
	};
}

export interface Environment extends EnvironmentProperties, EnvironmentConfig {}
