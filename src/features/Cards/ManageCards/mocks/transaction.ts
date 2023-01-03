const transaction = {
	uuid: 'd5c3b978-940b-4b96-9181-e552f0be7e76',
	countryCode: 'SG',
	cardUuid: 'c7043e04-2a2d-411b-9643-a871428c93db',
	partnerTransactionRefId: 'P_f4998f4cf04240ddbcaf42bf7a794432',
	amount: 31.31,
	currency: 'SGD',
	original_amount: 31.31,
	original_currency: 'SGD',
	transactionStatus: 'SUCCESS',
	invoiceUuid: '58980c05-69f7-4f39-9e5d-952370953386',
	loanUuid: null,
	payload: {
		consumer: {
			consumer_name: 'FUNDING SOCIETIES',
			prefund_balance: '90.000000',
		},
		debit_credit_indicator: 'D',
		payment_instrument: {
			balance_type: 'Shared Balance',
			card_brand: 'MASTER',
			card_form_factor: 'virtual',
			card_type_code: 'fsocgpmccard',
			expiry: '2027-08-31',
			initial_instrument_id: '966e68ce3f115d9f5f476ef130a04a0d',
			masked_number: 'XXXXXXXXXXXX4314',
			status: 'active',
			transaction_instrument_id: '7ca203fb6a36f78c8827b1ef589442aa',
		},
		time_stamp: '2022-10-07 15:19:07 +0800 UTC',
		total_amount: '31.31',
		total_currency: 'SGD',
		transaction: {
			authorization: {
				card_amount: '31.31',
				card_currency: 'SGD',
				fee_amount: '0.00',
				fee_currency: 'SGD',
				id: 'P_f4998f4cf04240ddbcaf42bf7a794432',
				local_transaction_timestamp: '',
				network: 'MASTER',
				network_reference_number: '929076491686',
				total_amount: '31.31',
				total_currency: 'SGD',
				transaction_amount: '31.31',
				transaction_currency: 'SGD',
				transaction_type: 'Purchase',
			},
			balance: {
				post_transaction: {
					available: {
						amount: '',
						currency: 'SGD',
					},
					categories: [
						{
							amount: '',
							currency: '',
							name: '',
						},
					],
				},
				pre_transaction: {
					available: {
						amount: '0.00',
						currency: 'SGD',
					},
					categories: [
						{
							amount: '0.00',
							currency: 'SGD',
							name: 'DEFAULT',
						},
					],
				},
			},
			merchant_details: {
				country_code: 'SGP',
				institution_code: '011255',
				merchant_category_code: '0780',
				merchant_id: '35796c442917c98c',
				name: 'one i love',
				terminal_id: 'RD105401',
			},
			payment_channel: {
				channel_name: 'ECOM',
				pos_entry_mode: 'MANUALLY_KEYED_ECOM',
			},
			transaction_fees: [
				{
					amount: '',
					code: '',
					currency: '',
					name: '',
				},
			],
			transaction_message: '',
			transaction_ref: 'P_f4998f4cf04240ddbcaf42bf7a794432',
			transaction_rules: {},
			transaction_status: '',
			verification_details: {
				address_verification_data: '',
			},
		},
		user: {
			email: 'qa+test.yiwentan924@fundingsocieties.com',
			kyc_status: 'post-kyc',
			mobile: '31111169',
			mobile_country_code: '65',
			user_hash: 'ca1fe97c853f2652cf432be877030f31',
		},
		webhook_event: 'OPENLOOP_PRE_AUTH',
	},
	category: 'Others',
	settledAt: null,
	createdAt: '2022-10-07T07:19:07Z',
	createdBy: 'credit-card-service',
	updatedAt: '2022-10-07T07:19:07.960642Z',
	updatedBy: 'credit-card-service',
	deletedAt: null,
};

export default transaction;
