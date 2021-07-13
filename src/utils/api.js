

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

  getInitialCards() {
    return fetch(this._baseURL + `/cards`, {
      headers: this._headers
    })
      .then(res => {
        return this._getSuccessfulReturn(res);
      })
  }

  addCard({link, name}){
    return fetch(this._baseURL + `/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({link, name})
    })
      .then(res => {
        return this._getSuccessfulReturn(res);
      })
  }

  deleteCard(id){
    return fetch(this._baseURL + `/cards/` + id, {
      headers: this._headers,
      method: "DELETE",
    })
      .then(res => {
        return this._getSuccessfulReturn(res);
      })
  }

  updateLikeTrue(cardID){
    return fetch(this._baseURL + `/cards/likes/` + cardID, {
      headers: this._headers,
      method: "PUT",
    })
      .then(res => {
        return this._getSuccessfulReturn(res);
      })
  }

  updateLikeFalse(cardID){
    return fetch(this._baseURL + `/cards/likes/` + cardID, {
      headers: this._headers,
      method: "DELETE",
    })
      .then(res => {
        return this._getSuccessfulReturn(res);
      })
  }

  getUserInfo(){
    return fetch(this._baseURL + `/users/me`, {
      headers: this._headers
    })
      .then(res => {
        return this._getSuccessfulReturn(res);
      })
  }

  updateUserInfo(values){
    return fetch(this._baseURL + `/users/me`,
    {
      headers: this._headers,
      method:"PATCH",
      body: JSON.stringify(values)
    })
      .then(res => {
        return this._getSuccessfulReturn(res);
      })
  }

  updateAvatar(link){
    return fetch(this._baseURL + `/users/me/avatar`,
    {
    headers: this._headers,
    method:"PATCH",
    body: JSON.stringify(link)
    })
      .then(res => {
        return this._getSuccessfulReturn(res);
      })
  }
}

export default new Api({
  baseURL: "https://around.nomoreparties.co/v1/group-7",
  headers: {
    authorization: "a5454f22-eab5-4384-8e26-57b127f56551",
    "Content-Type": "application/json"
  }
});
