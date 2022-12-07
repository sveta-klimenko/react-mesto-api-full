import Auth from "./Auth";

function Register({ onSubmit, submit, title, redirectLink = "" }) {
  return (
    <Auth
      onSubmit={onSubmit}
      submit={submit}
      title={title}
      redirectLink={redirectLink}
    />
  );
}

export default Register;
