import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Login({onLog, isLogged}) {
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
    onLog({
        email: emailValue,
        password: passwordValue
      })
  }

  useEffect(() => {
    if(isLogged) {
      navigate('/', {replace: true});
    }
  }, [isLogged])

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