import React, { FormEvent, useEffect } from "react";
import {
  $email,
  $emailError,
  $formDisabled,
  $loginByEmailError,
  $loginByEmailPending,
  $password,
  $passwordError,
  authModalMounted,
  emailChanged,
  loginByEmailFormSubmitted,
  passwordChanged,
} from "features/login-by-email/model";
import { useStore, useUnit } from "effector-react";
import clsx from "clsx";

export const AuthModal = () => {
  const [isPending, submit] = useUnit([
    $loginByEmailPending,
    loginByEmailFormSubmitted,
  ]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submit();
  }

  return (
    <>
      <input type="checkbox" id="auth-modal" className="modal-toggle" />
      <label htmlFor="auth-modal" className="modal cursor-pointer text-black">
        <label className="modal-box relative" htmlFor="">
          <form onSubmit={onSubmit} className="form-control">
            <h3 className="text-lg font-bold">
              Congratulations random Internet user!
            </h3>
            <Email />
            <Password />
            <ErrorView />
            <button
              className={clsx("btn-outline btn w-full", isPending && "loading")}
              disabled={isPending}
              type="submit"
            >
              Отправить
            </button>
          </form>
        </label>
      </label>
    </>
  );
};

function ErrorView() {
  const error = useStore($loginByEmailError);
  return <p className="mb-2 text-error">{error?.error.message}</p>;
}

const emailErrorText = {
  empty: "Пожалуйста введите почту",
  invalid: "Почта неверная",
};

const Email = () => {
  const [email, emailError, formDisabled] = useUnit([
    $email,
    $emailError,
    $formDisabled,
  ]);

  return (
    <>
      <label className="label">
        <span className="label-text">Email</span>
      </label>
      <input
        type="text"
        placeholder="ex@example.com"
        className={clsx(
          "input-bordered input w-full",
          emailError && "input-error",
        )}
        disabled={formDisabled}
        value={email}
        onChange={(event) => emailChanged(event.target.value)}
      />
      <label className="label">
        <span className="label-text-alt text-error">
          {emailError && emailErrorText[emailError]}
        </span>
      </label>
    </>
  );
};

const passwordErrorText = {
  empty: "Пожалуйста введите пароль",
  invalid: "Пароль неверный",
};

const Password = () => {
  const [password, passwordError, formDisabled] = useUnit([
    $password,
    $passwordError,
    $formDisabled,
  ]);

  return (
    <>
      <label className="label">
        <span className="label-text">Пароль</span>
      </label>
      <input
        type="password"
        placeholder="123456"
        className={clsx(
          "input-bordered input w-full",
          passwordError && "input-error",
        )}
        disabled={formDisabled}
        value={password}
        onChange={(event) => passwordChanged(event.target.value)}
      />
      <label className="label">
        <span className="label-text-alt text-error">
          {passwordError && passwordErrorText[passwordError]}
        </span>
      </label>
    </>
  );
};
