export const BASE_URL = 'https://register.nomoreparties.co';

function getSuccessfulReturn(res){
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
}

// Registering
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((res) => {
    return getSuccessfulReturn(res);
  })
  .then((res) => {
    console.log(res);
    return res;
  })
};


// Logging in / authorization
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then((res) => {
    return getSuccessfulReturn(res);
  })
  .then((data) => {
    if (data.token){
      localStorage.setItem('jwt', data.token);

      return data;
    }
  })
};




// check the user's token
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ token }`,
    }
  })
  .then((res) => {
    return getSuccessfulReturn(res);
  })
  .then(data => data)
}
