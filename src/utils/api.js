

class Api {
  constructor({baseURL, headers}) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  _getSuccessfulReturn(res){
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  _setJwtHeaders(jwt){
    const bearer = 'Bearer ' + jwt;
    if(jwt !== '') {
      return {
          authorization: bearer,
          "Content-Type": "application/json"
        }

    }
    return {
      headers: {
        "Content-Type": "application/json"
      }
    }
  }

  getInitialCards(jwt) {
    return fetch(this._baseURL + `/cards`, {
      headers: this._setJwtHeaders(jwt)
    })
      .then(res => {
        return this._getSuccessfulReturn(res);
      })
  }

  addCard(jwt, {link, name}){
    return fetch(this._baseURL + `/cards`, {
      headers: this._setJwtHeaders(jwt),
      method: "POST",
      body: JSON.stringify({link, name})
    })
      .then(res => {
        return this._getSuccessfulReturn(res);
      })
  }

  deleteCard(jwt, id){
    return fetch(this._baseURL + `/cards/` + id, {
      headers: this._setJwtHeaders(jwt),
      method: "DELETE",
    })
      .then(res => {
        return this._getSuccessfulReturn(res);
      })
  }

  updateLikeTrue(jwt, cardID){
    return fetch(this._baseURL + `/cards/likes/` + cardID, {
      headers: this._setJwtHeaders(jwt),
      method: "PUT",
    })
      .then(res => {
        return this._getSuccessfulReturn(res);
      })
  }

  updateLikeFalse(jwt, cardID){
    return fetch(this._baseURL + `/cards/likes/` + cardID, {
      headers: this._setJwtHeaders(jwt),
      method: "DELETE",
    })
      .then(res => {
        return this._getSuccessfulReturn(res);
      })
  }

  getUserInfo(jwt){
    return fetch(this._baseURL + `/users/me`, {
      headers: this._setJwtHeaders(jwt)
    })
      .then(res => {
        return this._getSuccessfulReturn(res);
      })
  }

  updateUserInfo(jwt, values){
    return fetch(this._baseURL + `/users/me`,
    {
      headers: this._setJwtHeaders(jwt),
      method:"PATCH",
      body: JSON.stringify(values)
    })
      .then(res => {
        return this._getSuccessfulReturn(res);
      })
  }

  updateAvatar(jwt, link){
    return fetch(this._baseURL + `/users/me/avatar`,
    {
    headers: this._setJwtHeaders(jwt),
    method:"PATCH",
    body: JSON.stringify(link)
    })
      .then(res => {
        return this._getSuccessfulReturn(res);
      })
  }
}

export default new Api({
  baseURL: process.env.NODE_ENV === "production" ? 'https://api.kethianne-around.students.nomoreparties.site' : 'http://localhost:3000',
});
