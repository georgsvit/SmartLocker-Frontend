const BASE_URL = 'https://localhost:44305'

export const environment = {
  production: false,
  baseUrl: BASE_URL,
  endpoints: {
    login: BASE_URL + '/account/login'
  }
};