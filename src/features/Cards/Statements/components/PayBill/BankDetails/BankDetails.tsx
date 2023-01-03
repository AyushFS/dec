import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFlags } from 'launchdarkly-react-client-sdk';
import Button, { ButtonSizes } from '../../../../../../components/Button';
import { COUNTRY_CODE } from '../../../../../../common/constant/enum/GeneralEnum';
import { ReactFCC } from '../../../../../../common/interface/react';
import { copyTextToClipboard } from '../../../../../../common/utilities/common';
import useGlobalState from '../../../../../GlobalState/useGlobalState';
import { useRequestGetBankAccountDetails, useRequestGetCards } from '../../../../useRequest';
import useCards from '../../../../UseCards';
import { GetCardsResponse } from '../../../../ManageCards/interface';
import { bankDetails } from '../constants';
import { BankDetail } from '../interface';
import styles from './BankDetails.module.scss';
import { getMasterCardUuid } from '../../../../utils';

interface BankDetailsProps {
	onBankDetailsLoaded: () => void;
}

const BankDetails: ReactFCC<BankDetailsProps> = ({ onBankDetailsLoaded }) => {
	const { t } = useTranslation();
	const { setSnackbar, isCurrentCountry } = useGlobalState();
	const { setCards, masterCardUuid } = useCards();
	const { isVANumberVisible } = useFlags();
	const isSG = isCurrentCountry(COUNTRY_CODE.SG);
	const isHighlightVisible = isVANumberVisible && isSG;

	const { isLoading: isLoadingCards } = useRequestGetCards({
		onSuccess: (cardsResponse: GetCardsResponse) => {
			setCards(cardsResponse?.cards);
			if (!getMasterCardUuid(cardsResponse?.cards)) {
				setSnackbar({
					message: t('statements.pay_bill.only_master_can_pay_bill'),
				});
			}
			return null;
		},
		onError: (err: any) => {
			console.log('error', err);
		},
		options: { enabled: !masterCardUuid },
	});

	const { isLoading: isLoadingBankDetails, data: bankAccountDetails } = useRequestGetBankAccountDetails({
		onSuccess: () => {
			onBankDetailsLoaded();
		},
		onError: (err: any) => {
			console.log('error', err);
		},
		params: { uuid: masterCardUuid },
		options: { enabled: !!masterCardUuid },
	});

	const copyText = (bankDetail: BankDetail) => {
		let textToCopy = bankAccountDetails[bankDetail.slug];
		if (bankDetail.slug === 'bank_account_number') {
			textToCopy = textToCopy.replace(/-/gm, '');
		}
		copyTextToClipboard(textToCopy);
		setSnackbar({
			message: t('statements.pay_bill.copied_to_clipboard', { label: t(`statements.pay_bill.${bankDetail.label}`) }),
		});
	};

	if (!bankAccountDetails || isLoadingCards || isLoadingBankDetails) {
		return <div data-testid="bank-details-component">{t('statements.pay_bill.loading_bank_details')}</div>;
	}

	return (
		<div data-testid="bank-details-component">
			<div className={styles.BankDetails}>
				{bankDetails.map((bankDetail) => (
					<div className={styles.BankDetailsItem} key={bankDetail.label}>
						<div className={styles.BankDetailsItemData}>
							<div className={styles.BankDetailsItemTitle}>
								{t(`statements.pay_bill.${bankDetail.label}`)}
								{bankDetail.label === 'account_name' && isHighlightVisible && (
									<div className={styles.highlightIcon}> {t('statements.pay_bill.new')}</div>
								)}
							</div>
							<div className={styles.BankDetailsItemValue}>{bankAccountDetails[bankDetail.slug]}</div>
						</div>
						<div className={styles.BankDetailsItemCopy}>
							<Button link size={ButtonSizes.small} onClick={() => copyText(bankDetail)}>
								{t('statements.pay_bill.copy')}
							</Button>
						</div>
					</div>
				))}
			</div>
			{isHighlightVisible && (
				<div className={styles.HighlightMessage}>{t('statements.pay_bill.highlight_message')}</div>
			)}
		</div>
	);
};

export default BankDetails;
