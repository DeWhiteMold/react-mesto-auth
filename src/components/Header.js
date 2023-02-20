import logo from '../images/logo.svg'

function Header() {

  return (
      <header className="header">
        <img src={logo} alt="Лого" className="header__logo" />
        <div className="header__user-info">
          <span className="header__user-email">sdfsfsdf</span>
          <button className="header__log-btn">fff</button>
        </div>
      </header>
  );
}

export default Header;