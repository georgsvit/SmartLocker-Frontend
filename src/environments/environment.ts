const BASE_URL = 'https://localhost:44305'

export const environment = {
  production: false,
  baseUrl: BASE_URL,
  endpoints: {
    login: BASE_URL + '/account/login',
    locker: BASE_URL + '/locker',
    blockLocker: BASE_URL + '/locker/block/{id}',
    unblockLocker: BASE_URL + '/locker/unblock/{id}',
    data: BASE_URL + '/data',
    backup: BASE_URL + '/data/backup',
    tool: BASE_URL + '/tool',
    servicebook: BASE_URL + '/servicebook',
    service: BASE_URL + '/service',
  }
};