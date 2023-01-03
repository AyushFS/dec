import { USER_ROLES } from '../../../../../../common/constant/enum/GeneralEnum';
import { UserEntity } from '../../../../../../common/interface/user';
import { CardDetails } from '../../../interface';
import { ExistingUserOptionType } from './interface';

const getOptions = (cards: Array<CardDetails> = [], users: UserEntity[] = []) => {
	const options: Array<ExistingUserOptionType> = [];
	users.forEach((user) => {
		const numOfCards = cards.filter((item) => item.userUuid === user.user_uuid).length;
		options.push({
			key: user.user_uuid,
			title: user.user_fullname,
			description: `${user.user_email} ${user.user_mobile_phone_number}`,
			cardsNum: numOfCards,
			userType: user.types?.[0] ?? USER_ROLES.CREDIT_CARD_ADDON,
		});
	});
	return options;
};

export default getOptions;
