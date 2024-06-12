import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';

/**
 * Generator that generates an auto incremented id.
 */
function* idGenerator() {
	let index = 5;
	while (true) {
		yield index++;
	}
}

export const id = idGenerator();

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

/**
 * A function handling the action provided with error handling to the client
 * @param action the function to be executed
 * @param event the event context of the endpoint executing this safe function
 * @param options object containg customization options for the output of this function.
 * Look at the interface above for the different options.
 * @param args all the arguments that should be passed along to the action
 * @redirects to the provided path (or home if no path is provided) with an error message if
 * something went wrong.
 * @returns status 200 with a success message and the result of the action
 */
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
