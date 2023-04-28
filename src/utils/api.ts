import { URL_API } from './constants'
import { getCookie } from '../utils/cookie';

const checkIFResp = (response: Response) => {
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

export const getOrder = (ingredients: Array<string| undefined>) => {
  return fetch(`${URL_API}/orders`, {
    method: 'POST',
    headers: {
      'authorization': `Bearer ${getCookie('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ingredients,
    })
  })
  .then(checkIFResp)
  .then(response => {return response})
}

export const resetPassword = (email: string) => {
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

export const setPassword = (password: string, code: string) => {
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


export const register = (email: string, password: string, name: string) => {
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

export const authorization = (email: string, password: string) => {
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


export const refreshTokenApi = () => {
  return fetch(`${URL_API}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'token': getCookie('refreshToken'),
    }),
  })
  .then(checkIFResp)
  .then(response => {return response})
}
  

export const logOut = () => {
  return fetch(`${URL_API}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'token': getCookie('refreshToken'),
    }),
  })
  .then(checkIFResp)
  .then(response => {return response})
}

export const getProfileData = () => {
  return fetch(`${URL_API}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${getCookie('token')}`,
    },
  })
  .then(checkIFResp)
  .then(response => {return response})
}

export const sendProfileData = (email: string | undefined, name: string | undefined, password: string) => {
  return fetch(`${URL_API}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${getCookie('token')}`,
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
