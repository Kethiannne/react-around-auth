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
  .then((response) => {
    return response.json();
  })
  .then((res) => {
    console.log(res);
    return res;
  })
  .catch((err) => console.log(`this is an error:${err}`));
};

// email: "nimblefizzle@gmail.com"
// _id: "60f39a8519370e0013efd5d1"


// Logging in / authorization
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email})
  })
  .then((res => res.json()))
  .then((data) => {
    console.log(data);
    if (data.user){
      localStorage.setItem('jwt', data.jwt);

      return data;
    }
  })
  .catch(err => console.log(err))
};




// // check the user's token
// export const checkToken = (token) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: 'GET',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     }
//   })
//   .then(res => res.json())
//   .then(data => data)
// }
