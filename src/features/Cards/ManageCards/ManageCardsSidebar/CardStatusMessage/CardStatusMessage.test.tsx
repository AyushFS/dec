import React from 'react';
import { render, screen } from '@testing-library/react';
import CardStatusMessage from './CardStatusMessage';
import { CARD_STATUS } from '../../../../../common/constant/enum/GeneralEnum';
import { AllowedInfoCardStatus } from './types';

describe('CardStatusMessage component', () => {
	test('should render properly for pending director card status', () => {
		render(<CardStatusMessage cardStatus={CARD_STATUS.PENDING_DIRECTOR} />);
		expect(screen.getByText('manage_cards.card_details.card_status.pending_director.title')).toBeInTheDocument();
		expect(screen.getByText('manage_cards.card_details.card_status.pending_director.body')).toBeInTheDocument();
		expect(screen.getByText('manage_cards.card_details.card_status.pending_director.check_status')).toBeInTheDocument();
	});

	test.each([CARD_STATUS.PENDING_CARD_PROVISION, CARD_STATUS.PENDING_INVITED_USER])(
		'should render properly for %s status',
		(status) => {
			render(<CardStatusMessage cardStatus={status as AllowedInfoCardStatus} />);
			expect(
				screen.getByText('manage_cards.card_details.card_status.pending_card_provision_and_invited_user.title')
			).toBeInTheDocument();
			expect(
				screen.getByText('manage_cards.card_details.card_status.pending_card_provision_and_invited_user.body')
			).toBeInTheDocument();
			expect(
				screen.getByText('manage_cards.card_details.card_status.pending_card_provision_and_invited_user.chat_with_us')
			).toBeInTheDocument();
		}
	);
});
