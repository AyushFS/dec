import staging from './environment.staging';
import uat from './environment.uat';
import production from './environment.production';
import productionId from './environment.production-id';
import { Environment } from './config';

interface ProdBaseUrl {
	host: string[];
	envFile: string;
}

const prodBaseURLS: ProdBaseUrl[] = [];

const environments: { [key: string]: Environment } = {
	staging,
	uat,
	production,
	'production-id': productionId,
};

const prodEnv = prodBaseURLS.find((prod) => prod.host.indexOf(window.location.host) !== -1);
const envName = (prodEnv ? prodEnv.envFile : window.localStorage.getItem('environment')) || 'staging';
const envValues = environments[envName];

const ENVIRONMENT = { ...envValues, version: '{BUILD_VERSION}' };

export default ENVIRONMENT;
