import React, { FC, memo, useCallback, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AddCardProps } from './types';
import styles from './AddCard.module.scss';
import UserTypeSelection from './steps/UserTypeSelection/UserTypeSelection';
import UserDetailsForm from './steps/UserDetailsForm';
import SpecifyLimit from './steps/SpecifyLimit';
import ExistingUser from './steps/ExistingUser/ExistingUser';
import { AddCardProvider } from './AddCardProvider';
import { ADD_CARD_STEPS } from './constants';
import AddCardFooter from './AddCardFooter/AddCardFooter';
import useCards from '../../UseCards';

const AddCard: FC<AddCardProps> = memo(({ redirectURL, allowDefaultRoute }) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const { step } = useParams();
	const { cardsSummary, reFetchCards } = useCards();

	const onCloseFlow = useCallback(() => {
		if (redirectURL) {
			navigate(redirectURL);
		} else {
			reFetchCards();
		}
	}, [navigate, reFetchCards, redirectURL]);

	const onUserDetailsContinue = useCallback(() => {
		navigate(`${redirectURL}/add-card/${ADD_CARD_STEPS.SPECIFY_LIMIT}`);
	}, [navigate, redirectURL]);

	const onUserDetailsFormBack = useCallback(() => {
		navigate('../add-card');
	}, [navigate]);

	const onSpecifyLimitBack = useCallback(() => {
		navigate(-1);
	}, [navigate]);

	useEffect(() => {
		if (allowDefaultRoute && step === undefined) {
			navigate(`${pathname}/${ADD_CARD_STEPS.USER_TYPE_SELECTION}`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<AddCardProvider>
			<div className={styles.addCardContainer} data-testid="add-card-container">
				{
					{
						[ADD_CARD_STEPS.USER_TYPE_SELECTION]: <UserTypeSelection onClose={onCloseFlow} />,
						[ADD_CARD_STEPS.USER_DETAILS_FORM]: (
							<UserDetailsForm
								onContinue={onUserDetailsContinue}
								onCancel={onCloseFlow}
								onBack={onUserDetailsFormBack}
							/>
						),
						[ADD_CARD_STEPS.SELECT_EXISTING_USER]: (
							<ExistingUser onCancel={onCloseFlow} onBack={onUserDetailsFormBack} onContinue={onUserDetailsContinue} />
						),
						[ADD_CARD_STEPS.SPECIFY_LIMIT]: (
							<SpecifyLimit
								onCancel={onCloseFlow}
								onBack={onSpecifyLimitBack}
								footerComponent={AddCardFooter}
								maxCardLimit={cardsSummary?.totalLimit}
							/>
						),
					}[step || ADD_CARD_STEPS.USER_TYPE_SELECTION]
				}
			</div>
		</AddCardProvider>
	);
});

AddCard.defaultProps = {
	allowDefaultRoute: false,
};

export default AddCard;
