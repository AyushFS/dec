import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/Card';
import Button, { ButtonColors } from '../../../components/Button';
import { getCashbackDetails, getCashbackRedemptionStates, getTotalCashbackEarned } from './CreditCard.service';
import { CashbackDetails, CashbackRedemption } from '../../../common/interface/cashback';
import { formatCurrency, getShortDate } from '../../../common/utilities/validationChecker/Utils';
import { COUNTRY_CODE, CURRENCY } from '../../../common/constant/enum/GeneralEnum';
import './Cashback.scss';
import detailDollar from './images/cashback_detail_dollar.svg';
import detailSmiley from './images/cashback_detail_smiley.svg';
import cardIconMoney from './images/cashback_detail_money.svg';
import cardIcon1 from './images/ic_cashback_transferred.png';
import cardIcon2 from './images/ic_cashback_earned.png';
import { MerchantIcon, merchantIcons } from './constants';

function Cashback() {
	const [loading, setLoading] = React.useState(true);
	const [cashbackDetails, setCashbackDetails] = React.useState<CashbackDetails>({} as CashbackDetails);
	const [cashbackRedemptionStates, setCashbackRedemptionStates] = React.useState<CashbackRedemption | null>(null);
	const [totalCashbackEarned, setTotalCashbackEarned] = React.useState<number>(0);
	const merchants: MerchantIcon[] = merchantIcons;

	const isRedeemDisabled = (): boolean => {
		if (!loading) {
			if (
				totalCashbackEarned > 20 &&
				(cashbackRedemptionStates === null || !cashbackRedemptionStates.isTransferPending)
			) {
				return false;
			}
			return true;
		}
		return true;
	};

	useEffect(() => {
		// fetch data from API
		const fetchData = async () => {
			setLoading(true);
			const cashbackRedemptionStatesValue = await getCashbackRedemptionStates();
			const cashbackDetailsValue = await getCashbackDetails();
			const totalCashbackEarnedValue = await getTotalCashbackEarned();
			setCashbackDetails(cashbackDetailsValue);
			setCashbackRedemptionStates(cashbackRedemptionStatesValue);
			setTotalCashbackEarned(totalCashbackEarnedValue.totalCashbackEarned);
			setLoading(false);
		};
		fetchData();
	}, []);

	if (loading) {
		return <div data-testid="cashback-page">Loading...</div>;
	}

	return (
		<div className="cashback-page" data-testid="cashback-page">
			<div className="banner">
				<img src={detailDollar} alt="dollar-icon" className="dollar-icon" />
				<div className="container">
					<p className="available-cashback m-0 t-white">Available cashback</p>
					<h5 className="cashback-amount t-white">
						{CURRENCY[COUNTRY_CODE.SG].value} <span>{formatCurrency(cashbackDetails?.currentRemainingBalance)}</span>
					</h5>
					<br />
					<Card icon={cardIconMoney} iconSize="small" borderRadius={15} cardPadding={3} contentPadding={0}>
						<img src={detailSmiley} alt="smiley-icon" className="smiley-icon" />
						<span className="total-cashback t-weight-medium">
							Total cashback earned:{' '}
							<span>
								{cashbackRedemptionStates?.currency} {formatCurrency(totalCashbackEarned)}
							</span>
						</span>
					</Card>
				</div>
				<div className="update-frequency t-white">Your cashback will be updated monthly</div>
			</div>
			<div className="container">
				<h6 className="mv-4">Cashback</h6>
				{cashbackRedemptionStates &&
					(cashbackRedemptionStates.isTransferPending ? (
						<div className="cashback-redemption-states">
							<Card icon={cardIcon1} iconSize="default" borderRadius={20} cardPadding={5} contentPadding={0}>
								<p className="cashback-title t-weight-medium">
									Transferred to bank account <br />({cashbackRedemptionStates.accountNumber})
								</p>
								<h6>
									<span className="cashback-amount">
										- {cashbackRedemptionStates?.currency}
										{cashbackRedemptionStates?.currency} {formatCurrency(cashbackRedemptionStates.amount)}
									</span>{' '}
									<span className="cashback-period">
										{getShortDate(new Date(cashbackRedemptionStates.transferDate ?? new Date()), true, true)}
									</span>
								</h6>
							</Card>
						</div>
					) : (
						<div className="cashback-redemption-states" />
					))}
				<Card icon={cardIcon2} borderRadius={20} cardPadding={5} contentPadding={0}>
					<p className="cashback-title t-weight-medium">Earned</p>
					<h6>
						<span className="cashback-amount">+ SGD 1.00</span>{' '}
						<span className="cashback-period">from mm/dd/yy - mm/dd/yy</span>
					</h6>
				</Card>
				<br />
				<h6 className="mv-4">How to earn cashback?</h6>
				<div className="howto-earn p-4">📢 &nbsp; 2% cashback for online spend with your Elevate card</div>
				<div className="merchant-icons">
					{merchants.map((merchant) => {
						return (
							<div className="merchant-icon" key={`${merchant.title}`}>
								<img src={merchant.imageUrl} alt={merchant.title} />
								<div className="merchant-title t-weight-medium">{merchant.title}</div>
							</div>
						);
					})}
				</div>
				<div className="card-details-link t-weight-medium">
					<Link to="/">
						View my card details <span>&rsaquo;</span>
					</Link>
				</div>
				<div className="t_and_c">
					* <u>T&amp;Cs</u> apply.
					<br />
					*Trade marks or logos appearing on this app may belong to third parties. All intellectual property rights
					property rights attached to such trade marks or logos belong to the respective third party owners.
				</div>
				<div className="redeem-btn">
					<Button block color={ButtonColors.primary} disabled={isRedeemDisabled()}>
						Redeem cashback now
					</Button>
					<div className="t-weight-medium redeem-condition">A minimum SGD 20.00 is required for redeemption</div>
				</div>
			</div>
		</div>
	);
}

export default Cashback;
