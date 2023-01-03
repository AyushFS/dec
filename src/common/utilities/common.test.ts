import { copyTextToClipboard, delay, generateUniqueId } from './common';

document.execCommand = jest.fn();

describe('Common', () => {
	describe('Delay', () => {
		beforeEach(() => {
			jest.useFakeTimers();
		});
		afterEach(() => {
			jest.useRealTimers();
		});

		test('should not resolve until expected timeout has elapsed', async () => {
			const spy = jest.fn();
			delay(1000).then(spy); // <= resolve after 1000ms

			jest.advanceTimersByTime(999); // <= advance less than 1000ms
			await Promise.resolve(); // let any pending callbacks in PromiseJobs run
			expect(spy).not.toHaveBeenCalled(); // SUCCESS

			jest.advanceTimersByTime(1); // <= advance less than 1000ms
			await Promise.resolve(); // let any pending callbacks in PromiseJobs run
			expect(spy).toHaveBeenCalled(); // SUCCESS
		});

		test('should use default timeout (2000ms) if time is not passed', async () => {
			const spy = jest.fn();
			delay().then(spy);

			jest.advanceTimersByTime(1999);
			await Promise.resolve();
			expect(spy).not.toHaveBeenCalled();

			jest.advanceTimersByTime(1);
			await Promise.resolve();
			expect(spy).toHaveBeenCalled();
		});
	});

	describe('copyTextToClipboard', () => {
		test('should copy text to clipboard', () => {
			const spy = jest.spyOn(document, 'execCommand');
			const text = 'Hello World';
			copyTextToClipboard(text);
			expect(spy).toHaveBeenCalledWith('copy');
		});
	});

	describe('generateUniqueId', () => {
		test('should generate unique id', () => {
			const id1 = generateUniqueId();
			const id2 = generateUniqueId();
			expect(id1).not.toBe(id2);
		});
	});
});
