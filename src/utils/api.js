const URL_API = 'https://norma.nomoreparties.space/api'

const checkIFResp = (response) => {
    return response.ok ? response.json() : response.json().then(err => Promise.reject(err))
}

export const getIngredientsFromAPI = () => {
  return fetch(`${URL_API}/ingredients`)
    .then(checkIFResp)
    .then(receivedIngredients => {
      if (receivedIngredients.success) {
          return receivedIngredients;
      }
    })
}

export const getOrder = (ingredients) => {
  return fetch(`${URL_API}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ingredients,
    })
  })
  .then(checkIFResp)
  .then(response => {return response})
}

export const resetPassword = (email) => {
  return fetch(`${URL_API}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    })
  })
  .then(checkIFResp)
  .then(response => {return response})
}

export const setPassword = (password, code) => {
  return fetch(`${URL_API}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'password': password,
      'token': code
    })
  })
  .then(checkIFResp)
  .then(response => {return response})
}


export const register = (email, password, name) => {
  return fetch(`${URL_API}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'email': email, 
      'password': password, 
      'name': name
    })
  })
  .then(checkIFResp)
  .then(response => {return response})
}

export const authorization = (email, password) => {
  return fetch(`${URL_API}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'email': email, 
      'password': password
    }),
  })
  .then(checkIFResp)
  .then(response => {return response})
}


export const refreshTokenApi = (refreshToken) => {
  return fetch(`${URL_API}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'token': refreshToken,
    }),
  })
  .then(checkIFResp)
  .then(response => {return response})
}
  

export const logOut = (refreshToken) => {
  return fetch(`${URL_API}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'token': refreshToken,
    }),
  })
  .then(checkIFResp)
  .then(response => {return response})
}

export const getProfileData = (accessToken) => {
  return fetch(`${URL_API}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${accessToken}`,
    },
  })
  .then(checkIFResp)
  .then(response => {return response})
}

export const sendProfileData = (accessToken, email, name, password) => {
  return fetch(`${URL_API}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      'email': email,
      'name': name,
      'password': password
    }),
  })
  .then(checkIFResp)
  .then(response => {return response})
}
