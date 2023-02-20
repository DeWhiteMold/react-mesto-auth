function Login() {
  return (
    <main className="authorisation">
      <form className="authorisation-form">
        <h2 className="authorisation__title">Вход</h2>
        <input type="email" className="authorisation__input" placeholder="Email" />
        <input type="password" className="authorisation__input" placeholder="Пароль" />
        <button type="submit" className="authorisation__submit-btn">Войти</button>
      </form>
    </main>
  )
}

export default Login;