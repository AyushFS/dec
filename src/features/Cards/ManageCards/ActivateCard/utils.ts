import { Director } from '../interface';
import { DirectorOptionType } from './interface';

export type UuidToDirectorMap = { [k: string]: Director };

export const mapDirectorToDirectorOption = (directors: Array<Director>): Array<DirectorOptionType> => {
	return directors.map((director) => ({
		key: director.uuid,
		title: director.name,
		uuid: director.uuid,
		description: director.email ? director.email : 'No email address found',
		disabled: !director.email,
	}));
};
