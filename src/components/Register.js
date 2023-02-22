import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from '../utils/AuthApi.js';

function Register({ onReg, onError }) {
  const navigate = useNavigate();

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  function handleEmailInput(e) {
    setEmailValue(e.target.value);
  }

  function handlePasswordInput(e) {
    setPasswordValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    authApi.singUp({
      password: passwordValue,
      email: emailValue
    })
    .then((res) => {
      console.log(res);
      onReg()
    })
    .then(() => {
      setEmailValue('');
      setPasswordValue('');
    })
    .catch(() => {
      onError()
    })
  }

  function handleSwichBtnClick() {
    navigate('/sing-in', {replace: true});
  }

  return (
    <main className="authorisation">
      <form className="authorisation__form" onSubmit={handleSubmit}>
        <h2 className="authorisation__title">Регистрация</h2>
        <input type="email" className="authorisation__input" placeholder="Email" value={emailValue} onChange={handleEmailInput} />
        <input type="password" className="authorisation__input" placeholder="Пароль" value={passwordValue} onChange={handlePasswordInput} />
        <button className="authorisation__submit-btn" type="submit">Зарегистрироваться</button>
        <button className="authorisation__login-btn" type="button" onClick={handleSwichBtnClick}>Уже зарегистрированы? Войти</button>
      </form>
    </main>
  )
}

export default Register;