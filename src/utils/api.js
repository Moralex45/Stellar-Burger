const URL_API = 'https://norma.nomoreparties.space/api'
const INGREDIENTS_ENDPOINT = 'ingredients'
const ORDER_ENDPOINT = 'orders'

const checkIFResp = (response) => {
    return response.ok ? response.json() : response.json().then(err => Promise.reject(err))
}

export const getIngredientsFromAPI = () => {
  return fetch(`${URL_API}/${INGREDIENTS_ENDPOINT}`)
    .then(checkIFResp)
    .then(receivedIngredients => {
      if (receivedIngredients.success) {
          return receivedIngredients;
      }
    })
}

export const getOrder = (ingredients) => {
  return fetch(`${URL_API}/${ORDER_ENDPOINT}`, {
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
