const URL_API = 'https://norma.nomoreparties.space/api'
const INGREDIENTS_ENDPOINT = 'ingredients'

const checkIFResp = (response) => {
    return response.ok ? response.json() : response.json().then(err => Promise.reject(err))
}

export const getIngredientsFromAPI = () => {
    return fetch(`${URL_API}/${INGREDIENTS_ENDPOINT}`)
      .then(checkIFResp)
      .then(receivedIngredients => {
        if (receivedIngredients.success) {
            return receivedIngredients.data;
        }
      })
}
