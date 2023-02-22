import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import authApi from '../utils/AuthApi';

function Login({onLog, onError}) {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const navigate = useNavigate();

  function handleEmailInput(e) {
    setEmailValue(e.target.value);
  }

  function handlePasswordInput(e) {
    setPasswordValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    authApi.singIn({
      email: emailValue,
      password: passwordValue
    })
    .then((res) => {
      onLog();
      navigate('/', {replace: true});
      localStorage.setItem('token', res.token);
    })
    .then(() => {
      setEmailValue('');
      setPasswordValue('');
    })
    .catch(() => {
      onError();
    })
  }

  useEffect(() => {
    authApi.checkValid(localStorage.getItem('token'))
    .then((res) => {
      onLog(res.data.email);
      navigate('/', {replace: true});
    })
  }, [])

  return (
    <main className="authorisation">
      <form className="authorisation__form" onSubmit={handleSubmit}>
        <h2 className="authorisation__title">Вход</h2>
        <input type="email" className="authorisation__input" placeholder="Email" value={emailValue} onChange={handleEmailInput} />
        <input type="password" className="authorisation__input" placeholder="Пароль" value={passwordValue} onChange={handlePasswordInput} />
        <button type="submit" className="authorisation__submit-btn">Войти</button>
      </form>
    </main>
  )
}

export default Login;