import { COUNTRY_CODE, CURRENCY } from '../constant/enum/GeneralEnum';
import { formatCurrency } from './validationChecker/Utils';

export const useCurrencyFormat = (countryCode: COUNTRY_CODE) => {
	const currencySymbolByCountry = () => {
		switch (countryCode) {
			case COUNTRY_CODE.ID:
				return CURRENCY.ID.symbol;
			default:
				return CURRENCY.SG.value;
		}
	};
	const formatCurrencyByCountry = (value: number | string = 0, symbol: boolean = true) => {
		switch (countryCode) {
			case COUNTRY_CODE.ID:
				return `${symbol ? CURRENCY.ID.symbol : ''} ${formatCurrency(Number(value), 2, ',', '.')}`;
			default:
				return `${symbol ? CURRENCY.SG.value : ''} ${formatCurrency(Number(value))}`;
		}
	};
	return {
		currencySymbolByCountry: currencySymbolByCountry(),
		formatCurrencyByCountry,
	};
};

export default { useCurrencyFormat };
