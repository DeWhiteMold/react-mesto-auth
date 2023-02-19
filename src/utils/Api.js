import { apiOption } from "./data.js";

class Api {
  constructor(option) {
    this._cohort = option.cohort;
    this._token = option.token;
    this._serverLink = option.serverLink;
    this._headers =  {
        authorization: this._token,
        'Content-type': 'application/json'
      }
  }
  
  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._serverLink}/${this._cohort}/users/me`, { headers: this._headers })
      .then(res => { return this._getResponse(res) });
  }

  getInitialCards() {
    return fetch(`${this._serverLink}/${this._cohort}/cards`, { headers: this._headers })
      .then((res) => { return this._getResponse(res) });
  }

  updateUsetInfo(newName, newAbout) {
    return fetch(`${this._serverLink}/${this._cohort}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    })
      .then((res) => { return this._getResponse(res) })
  }

  updateUserAvatar(newAvatar) {
    return fetch(`${this._serverLink}/${this._cohort}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatar
      })
    })
      .then((res) => { return this._getResponse(res) })
  }

  postNewCard(newName, newLink) {
    return fetch(`${this._serverLink}/${this._cohort}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        link: newLink
      })
    })
      .then((res) => { return this._getResponse(res) })
  }

  deleteCard(cardId) {
    return fetch(`${this._serverLink}/${this._cohort}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => { return this._getResponse(res) });
  }
  
  addLike(cardId) {
    return fetch(`${this._serverLink}/${this._cohort}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => { return this._getResponse(res) });
  }

  deleteLike(cardId) {
    return fetch(`${this._serverLink}/${this._cohort}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => { return this._getResponse(res) });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.addLike(cardId) : this.deleteLike(cardId);
  }
}

const api = new Api(apiOption);

export default api;