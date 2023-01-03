import { SHORT_MONTH_NAMES } from '../constant/enum/GeneralEnum';

export function getTimeFromDate(date: Date) {
	const dt = new Date(date);
	if (Number.isNaN(dt.getTime())) {
		return '';
	}
	return `${String(dt.getHours()).padStart(2, '0')}:${String(dt.getMinutes()).padStart(2, '0')}`;
}

export function getShortDateAndTime(date: Date) {
	const dt = new Date(date);
	if (Number.isNaN(dt.getTime())) {
		return '';
	}
	const shortMonth = SHORT_MONTH_NAMES[dt.getMonth()];
	return `${dt.getDate()} ${shortMonth} ${dt.getFullYear()}, ${getTimeFromDate(date)}`;
}

export function getShortMonthYear(date: Date) {
	const dt = new Date(date);
	const month = dt.toLocaleString('default', { month: 'long' });
	const year = dt.toLocaleString('default', { year: 'numeric' });
	return `${month}, ${year}`;
}

export function getShortDateMonth(date: Date) {
	const dt = new Date(date);
	const day = dt.toLocaleString('default', { day: '2-digit' });
	const month = dt.toLocaleString('default', { month: 'short' });
	return `${day} ${month}`;
}
