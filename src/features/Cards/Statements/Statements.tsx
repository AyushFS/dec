import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ReactFCC } from '../../../common/interface/react';
import StickyHeader from '../../../components/StickyHeader';
import useAuth from '../../Auth/useAuth';
import useGlobalState from '../../GlobalState/useGlobalState';
import { cardModulePath } from '../constants';
import { useRequestGetStatements, useRequestGetStatementsBill } from '../useRequest';
import BillDetails from './components/BillDetails';
import DueAmountAlertBox from './components/DueAmountAlertBox';
import PayBill from './components/PayBill';
import StatementList from './components/StatementList';
import { Bill, StatementData } from './interface';
import styles from './Statements.module.scss';

interface StatementsProps {}

const Statements: ReactFCC<StatementsProps> = () => {
	const { isMobile } = useGlobalState();
	const { auth } = useAuth();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const [bill, setBill] = useState<Bill>({} as Bill);
	const [statementsData, setStatementsData] = useState<StatementData[]>([]);

	const { isFetching: isFetchingBill } = useRequestGetStatementsBill({
		onSuccess: (cardsResponse: Bill) => {
			setBill(cardsResponse);
		},
		onError: (err: any) => {
			console.log('error', err);
		},
	});

	const { isFetching: isFetchingStatements } = useRequestGetStatements({
		onSuccess: (cardsResponse: any) => {
			setStatementsData(cardsResponse.data);
		},
		onError: (err: any) => {
			console.log('error', err);
		},
		params: { uuid: auth?.member_uuid },
	});

	const backToStatements = () => {
		navigate(`${cardModulePath}/statement`);
	};
	const showPayBillSection = () => {
		navigate(`${cardModulePath}/statement/pay-bill`);
	};
	const showBillDetailsSection = () => {
		navigate(`${cardModulePath}/statement/view-bill`);
	};

	const loader = <div>Loading...</div>;

	const billComponent =
		isFetchingBill || isFetchingStatements ? (
			loader
		) : (
			<BillDetails
				bill={bill}
				statements={statementsData}
				onBackClick={backToStatements}
				onPayNowClick={showPayBillSection}
			/>
		);

	const payBillComponent =
		isFetchingBill || isFetchingStatements ? (
			loader
		) : (
			<PayBill
				bill={bill}
				onBackClick={backToStatements}
				onPaidClick={backToStatements}
				onPayLaterClick={backToStatements}
			/>
		);

	const dueAmountAlertBoxComponent = isFetchingBill ? (
		loader
	) : (
		<DueAmountAlertBox bill={bill} onPayNowClick={showPayBillSection} onViewDetailsClick={showBillDetailsSection} />
	);

	return (
		<div className={styles.Statements} data-testid="statements-component">
			<div className={isMobile ? 'container-fluid' : 'container'}>
				<Routes>
					<Route
						path="/"
						element={
							<>
								<div className={styles.DueAmountAlertBoxContainer}>{dueAmountAlertBoxComponent}</div>
								<StickyHeader>
									<h6 className={styles.StatementsTitle}>{t('statements.title')}</h6>
								</StickyHeader>
								<div className="row">
									<div className="col col--12/12-small">
										{isFetchingStatements ? loader : <StatementList statements={statementsData} />}
									</div>
								</div>
							</>
						}
					/>
					<Route path="/view-bill" element={billComponent} />
					<Route path="/pay-bill" element={payBillComponent} />
				</Routes>
			</div>
		</div>
	);
};

export default Statements;
