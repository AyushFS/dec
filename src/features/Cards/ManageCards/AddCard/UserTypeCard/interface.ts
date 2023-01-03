import React from 'react';
import { USER_TYPES } from '../constants';

export interface UserTypeCardProps {
	title: string;
	description: string;
	value: USER_TYPES;
	checked?: boolean;
	icon?: React.ReactNode;
	onSelected: (value: USER_TYPES) => void;
}
