import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';

function* idIterator() {
	let index = 5;
	while (true) {
		yield index++;
	}
}

export const idGenerator = idIterator();

type ActionFunction = (...args: any[]) => any;

interface SafeExecuteOption<T extends ActionFunction> {
	action: T;
	event: RequestEvent;
	options?: {
		redirectUrl?: string;
		successMsg?: string;
		fallbackErrorMsg: string;
	};
}

export function safeExecute<T extends ActionFunction>(
	{ action, event, options }: SafeExecuteOption<T>,
	...args: Parameters<T>
): { status: number; message: string; data: ReturnType<T> } {
	let result;
	try {
		result = action(...args);
	} catch (err) {
		if (err instanceof Error) {
			redirect(options?.redirectUrl || '/', { type: 'error', message: err.message }, event);
		} else {
			redirect(
				options?.redirectUrl || '/',
				{
					type: 'error',
					message: options?.fallbackErrorMsg || 'Something went wrong, please try again!'
				},
				event
			);
		}
	}

	return { status: 200, message: options?.successMsg || 'Success', data: result };
}
