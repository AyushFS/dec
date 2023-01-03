import { CARD_STATUS } from '../../../../../common/constant/enum/GeneralEnum';

export type AllowedInfoCardStatus =
	| CARD_STATUS.PENDING_CARD_PROVISION
	| CARD_STATUS.PENDING_DIRECTOR
	| CARD_STATUS.PENDING_INVITED_USER;

export interface CardStatusMessageConfig {
	title: string;
	body: string;
	button: {
		text: string;
	};
}

export type CardStatusMessageConfigs = {
	[k in CARD_STATUS]?: CardStatusMessageConfig;
};
