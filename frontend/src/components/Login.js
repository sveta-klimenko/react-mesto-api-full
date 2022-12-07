import Auth from "./Auth";

function Login({ onSubmit, submit, title, redirectLink = "" }) {
  return (
    <Auth
      onSubmit={onSubmit}
      submit={submit}
      title={title}
      redirectLink={redirectLink}
    />
  );
}

export default Login;
