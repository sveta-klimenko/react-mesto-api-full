class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this.handleResponse);
  }

  getCards() {
    return this._request(this.url + "/cards", {
      headers: this.headers,
    });
  }

  createCard(data) {
    return this._request(this.url + "/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    });
  }

  deleteCard(id) {
    return this._request(this.url + "/cards/" + id, {
      method: "DELETE",
      headers: this.headers,
    });
  }

  getPersonalInfo() {
    return this._request(this.url + "/users/me", {
      headers: this.headers,
    });
  }

  updatePersonalInfo(data) {
    return this._request(this.url + "/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    });
  }

  updateAvatar(data) {
    return this._request(this.url + "/users/me/avatar ", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    });
  }

  changeLikeCardStatus(id, isLiked) {
    return this._request(this.url + "/cards/" + id + "/likes", {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: this.headers,
    });
  }


  register(email, password) {
  return this._request(this.url + "/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, email }),
  });
}

login(email, password) {
  return this._request(this.url + "/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, email }),
  });
}

setToken(token) {
  this.headers = {
    Authorization: `${token}`,
    "content-Type": "application/json",
  }
}

}

const api = new Api({
  url: "https://dogroseknight.back.nomoredomains.club",
  headers: {
    Authorization: "",
    "content-Type": "application/json",
  },
});

export default api;
