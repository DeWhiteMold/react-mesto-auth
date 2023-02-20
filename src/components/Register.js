function Register() {
  return (
    <main className="authorisation">
      <form className="authorisation__form">
        <h2 className="authorisation__title">Регистрация</h2>
        <input type="email" className="authorisation__input" placeholder="Email" />
        <input type="password" className="authorisation__input" placeholder="Пароль" />
        <button className="authorisation__submit-btn" type="submit">Зарегистрироваться</button>
        <button className="authorisation__login-btn" type="button">Уже зарегистрированы? Войти</button>
      </form>
    </main>
  )
}

export default Register;