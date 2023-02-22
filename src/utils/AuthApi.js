class AuthApi {
  constructor(url) {
    this._url = url;
    this._headers = { "Content-Type": "application/json" };
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  singIn(inputData){
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(inputData)
    }).then((res) => {return this._getResponse(res)})
  }

  singUp(inputData){
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(inputData)
    }).then((res) => {return this._getResponse(res)})
  }

  checkValid(JWTtoken){
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${JWTtoken}`
    }
    }).then((res) => {return this._getResponse(res)})
  }
}

const authApi = new AuthApi('https://auth.nomoreparties.co');

export default authApi;