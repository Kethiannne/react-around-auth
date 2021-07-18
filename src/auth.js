export const BASE_URL = 'https://register.nomoreparties.co';


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
    return res.json();
  })
  .then((res) => {
    console.log(res);
    return res;
  })
  .catch((err) => console.log(`this is an error with registering: ${ err }`));
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
  .then((res => res.json()))
  .then((data) => {
    console.log(data);
    if (data.token){
      localStorage.setItem('jwt', data.token);

      return data;
    }
  })
  .catch(err => console.log(err))
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
  .then(res => res.json())
  .then(data => data)
}
