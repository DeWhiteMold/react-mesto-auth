import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg'

function Header({email, onExit}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [btnText, setBtnState] = useState('');
  const [path, setPath] = useState('');
  const [userEmail, setUserEmail] = useState(email);

  function handleClick() {
    navigate(path, {replace: true})
    if(location.pathname === '/') {
      onExit();
    }
  }

  useEffect(() => {
    setUserEmail(email);
    if(location.pathname === '/sing-in') {
      setBtnState('Регистрация');
      setPath('/sing-up');
    }
    else if(location.pathname === '/sing-up') {
      setBtnState('Войти');
      setPath('/sing-in');
    }
    else {
      setUserEmail(email);
      setBtnState('Выйти');
      setPath('/sing-in');
    }
  }, [location, email])

  return (
      <header className="header">
        <img src={logo} alt="Лого" className="header__logo" />
        <div className="header__user-info">
          <span className="header__user-email">{userEmail}</span>
          <button className={`header__log-btn ${btnText === 'Выйти' ? 'header__log-btn_logged' : ''}`} onClick={handleClick} >{btnText}</button>
        </div>
      </header>
  );
}

export default Header;