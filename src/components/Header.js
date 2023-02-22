import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg'

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [btnText, setBtnState] = useState('');
  const [path, setPath] = useState('');

  function handleClick() {
    navigate(path, {replace: true})
  }

  useEffect(() => {
    if(location.pathname === '/sing-in') {
      setBtnState('Регистрация');
      setPath('/sing-up');
    }
    else if(location.pathname === '/sing-up') {
      setBtnState('Войти');
      setPath('/sing-in');
    }
    else {
      setBtnState('Выйти');
      setPath('/sing-in');
    }
  }, [location])

  return (
      <header className="header">
        <img src={logo} alt="Лого" className="header__logo" />
        <div className="header__user-info">
          <span className="header__user-email"></span>
          <button className="header__log-btn" onClick={handleClick} >{btnText}</button>
        </div>
      </header>
  );
}

export default Header;