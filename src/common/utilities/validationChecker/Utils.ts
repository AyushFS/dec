import { SHORT_MONTH_NAMES } from '../../constant/enum/GeneralEnum';

function maskShortDate(date: string): string {
	return date.split(' ').join('/');
}

export function getShortMonthName(month: number): string {
	return SHORT_MONTH_NAMES[month];
}

export function getShortDate(date: Date | number, monthInNumber: Boolean = false, dashFormat: boolean = false): string {
	const dt = new Date(date);
	if (Number.isNaN(dt.getTime())) {
		return '';
	}
	const shortMonth = monthInNumber ? String(dt.getMonth() + 1).padStart(2, '0') : SHORT_MONTH_NAMES[dt.getMonth()];
	return dashFormat
		? maskShortDate(`${dt.getDate()} ${shortMonth} ${dt.getFullYear()}`)
		: `${dt.getDate()} ${shortMonth} ${dt.getFullYear()}`;
}
export function formatCurrency(
	amount: number,
	decimalCount: number = 2,
	decimal: string = '.',
	thousands: string = ','
) {
	decimalCount = Math.abs(decimalCount);
	decimalCount = Number.isNaN(decimalCount) ? 2 : decimalCount;

	const i: string = parseInt(Math.abs(Number(amount) || 0).toFixed(decimalCount), 10).toString();
	const j: number = i.length > 3 ? i.length % 3 : 0;

	const negativeSign = amount < 0 ? '-' : '';
	const thousandsResult =
		(j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`);
	const decimalResult = decimalCount
		? decimal +
		  Math.abs(Math.abs(amount) - parseFloat(i))
				.toFixed(decimalCount)
				.slice(2)
		: '';

	return `${negativeSign}${thousandsResult}${decimalResult}`;
}

export function isDaysBeforeDate(date: string | number, daysBefore: number) {
	const compareDate: number = new Date(date).setHours(0, 0, 0, 0);
	const currentDate: number = new Date().setHours(0, 0, 0, 0);
	const dateDiff = compareDate - currentDate;
	const daysDiff = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
	if (dateDiff >= 0 && daysDiff <= daysBefore) {
		return true;
	}
	return false;
}

export function isDaysAfterDate(date: string | number, daysAfter: number) {
	const compareDate: number = new Date(date).setHours(0, 0, 0, 0);
	const currentDate: number = new Date().setHours(0, 0, 0, 0);
	const dateDiff = currentDate - compareDate;
	const daysDiff = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
	if (dateDiff > 0 && daysDiff <= daysAfter) {
		return true;
	}
	return false;
}
