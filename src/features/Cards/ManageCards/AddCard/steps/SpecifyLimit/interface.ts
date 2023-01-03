import React from 'react';
import { FooterProps } from '../../../interface';

export interface SpecifyLimitProps {
	footerComponent: React.FC<FooterProps>;
	currentLimit?: string;
	maxCardLimit?: string;
	userUuid?: string;
	cardUuid?: string;
	cardSpendPurposeUuid?: string;
	isEditMode?: boolean;
	onCancel: () => void;
	onBack?: () => void;
}

export interface SpecifyLimitEntity {
	spendLimit: string;
	spendPurpose: string;
}
