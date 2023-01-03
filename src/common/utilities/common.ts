export function delay(n?: number) {
	n = n || 2000;
	return new Promise((done) => {
		setTimeout(done, n);
	});
}

export function loadJs(url: string) {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = url;
		script.onload = resolve;
		script.onerror = reject;
		document.head.appendChild(script);
	});
}

export function copyTextToClipboard(text: string) {
	const input = document.createElement('input');
	input.value = text;
	document.body.appendChild(input);
	input.select();
	document.execCommand('copy');
	document.body.removeChild(input);
}

export const generateUniqueId = () => {
	return Math.random().toString(36).substr(2, 9);
};
