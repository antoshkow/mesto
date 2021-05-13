export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    this.deleteCard = this.deleteCard.bind(this);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  editProfile(userData) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(userData)
    })
    .then(this._checkResponse);
  }

  addNewCard(cardData) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(cardData)
    })
    .then(this._checkResponse);
  }

  like(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  unlike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  updateAvatar(userData) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(userData)
    })
    .then(this._checkResponse);
  }
}
