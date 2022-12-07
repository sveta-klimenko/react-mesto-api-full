import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function Auth({ onSubmit, submit, title, redirectLink = "" }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(emailRef.current.value, passwordRef.current.value);
  }

  return (
    <main className="auth">
      <h2 className="auth__title">{title}</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <fieldset className="auth__fieldset">
          <input
            type="email"
            className="auth__input"
            id="email"
            name="email"
            placeholder="Email"
            required
            ref={emailRef}
          />
          <input
            type="password"
            className="auth__input"
            id="password"
            name="password"
            placeholder="Пароль"
            required
            ref={passwordRef}
          />
          <button className="auth__button" type="submit">
            {submit}
          </button>
        </fieldset>
      </form>
      {redirectLink && (
        <Link to={redirectLink} className="auth__redirect">
          Уже зарегистрированы? Войти
        </Link>
      )}
    </main>
  );
}

export default Auth;
