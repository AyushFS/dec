import React from 'react';
import { ReactFCC } from '../../common/interface/react';
import Image from '../Image';
import logoIcon from '../../images/logos/logo-icon.svg';
import logoFs from '../../images/logos/logo-fs.svg';
import logoStacked from '../../images/logos/logo-fs-stacked.svg';
import logoFsmk from '../../images/logos/logo-fsmk.svg';

export enum LogoTypes {
	'icon' = 'icon',
	'stacked' = 'stacked',
	'fs' = 'fs',
	'fsmk' = 'fsmk',
}

interface LogoProps {
	type?: LogoTypes;
}

const Logo: ReactFCC<LogoProps> = (props) => {
	const { type, ...restOfTheAttributes } = props;
	const logoMapping: { [key: string]: string } = {
		icon: logoIcon,
		fs: logoFs,
		fsmk: logoFsmk,
		stacked: logoStacked,
	};
	return <Image src={logoMapping[type || LogoTypes.icon]} {...restOfTheAttributes} responsive />;
};

export default Logo;
