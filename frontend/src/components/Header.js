import logo_white from "../images/logo-white.svg";

function Header({ email = "", onClick, redirectTitle }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo_white} alt="Логотип: Место" />
      <div className="header__info">
        {email && <p className="header__info_email">{email}</p>}
        <button className="header__info_redirect" onClick={onClick}>
          {redirectTitle}
        </button>
      </div>
    </header>
  );
}

export default Header;
