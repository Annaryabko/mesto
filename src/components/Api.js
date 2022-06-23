export class Api {
  constructor(options) {
    this._options = options;
  }

  _makeRequest(url, method, body) {
    const fetchOptions = {
      method,
      headers: this._options.headers,
    };
    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    return fetch(`${this._options.baseUrl}${url}`, fetchOptions).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getInitialCards() {
    return this._makeRequest("cards", "GET");
  }
  editName(data) {
    return this._makeRequest("users/me", "PATCH", {
      name: data.name,
      about: data.about,
    });
  }

  editAvatar(data) {
    return this._makeRequest("users/me/avatar", "PATCH", {
      avatar: data.avatar,
    });
  }

  addCard(data) {
    return this._makeRequest("cards", "POST", {
      name: data.name,
      link: data.link,
    });
  }

  addLike(cardId) {
    return this._makeRequest(`cards/${cardId}/likes`, "PUT");
    // PUT https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
  }

  deleteLike(cardId) {
    return this._makeRequest(`cards/${cardId}/likes`, "DELETE");
    // DELETE https://mesto.nomoreparties.co/v1/cohortId/cards/cardId/likes
  }

  deleteCard(id) {
    return this._makeRequest(`cards/${id}`, "DELETE");
  }

  getUser() {
    return this._makeRequest("users/me", "GET");
  }
}
