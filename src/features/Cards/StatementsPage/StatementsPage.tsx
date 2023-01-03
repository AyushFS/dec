import React from 'react';
import Statements from '../Statements';
import './StatementsPage.scss';

function StatementsPage() {
	return (
		<div className="statements-page" data-testid="statements-page">
			<Statements />
		</div>
	);
}

export default StatementsPage;
