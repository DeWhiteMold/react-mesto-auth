import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Register({ onReg, isError }) {
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
    onReg({
        password: passwordValue,
        email: emailValue
      });
  }

  function handleSwichBtnClick() {
    navigate('/sing-in', {replace: true});
  }

  useEffect(() => {
    if(!isError) {
      setEmailValue('');
      setPasswordValue('');
    }
  }, [isError])

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