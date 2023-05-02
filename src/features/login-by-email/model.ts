import { attach, createEvent, createStore, sample } from 'effector';
import { and, every, not, or, reset } from 'patronum';
import { loginByEmailFx } from 'shared/api/auth/request';
import { SignInError } from 'shared/api/auth/types';

const signInFx = attach({ effect: loginByEmailFx });

export const authModalMounted = createEvent();

export const emailChanged = createEvent<string>();
export const passwordChanged = createEvent<string>();
export const loginByEmailFormSubmitted = createEvent();

export const $email = createStore('');
export const $emailError = createStore<null | 'invalid' | 'empty'>(null);

export const $password = createStore('');
export const $passwordError = createStore<null | 'invalid' | 'empty'>(null);

export const $loginByEmailPending = signInFx.pending;
export const $formDisabled = or($loginByEmailPending);

const $isFormValid = every({
	stores: [$emailError, $passwordError],
	predicate: null,
});

export const $loginByEmailError = createStore<SignInError | null>(null);

reset({
	clock: authModalMounted,
	target: [$email, $emailError, $password, $passwordError, $loginByEmailError],
});

$email.on(emailChanged, (_, email) => email);
$password.on(passwordChanged, (_, password) => password);

$loginByEmailError.reset(loginByEmailFormSubmitted);


sample({
	clock: loginByEmailFormSubmitted,
	source: $email,
	fn: (email) => {
		if (isEmpty(email)) return "empty"
		return null
	},
	target: $emailError
})

sample({
	clock: loginByEmailFormSubmitted,
	source: $password,
	fn: (password) => {
		if (isEmpty(password)) return "empty"
		return null
	},
	target: $passwordError
})

sample({
	clock: loginByEmailFormSubmitted,
	source: { identifier: $email, password: $password },
	filter: and(not($formDisabled), $isFormValid),
	target: signInFx,
});

$loginByEmailError.on(signInFx.failData, (_, error) => error)

function isEmpty(string: string) {
	return string.length < 5
}