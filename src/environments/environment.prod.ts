const BASE_URL = 'https://localhost:44305'

export const environment = {
  production: false,
  baseUrl: BASE_URL,
  endpoints: {
    login: BASE_URL + '/account/login',
    register: BASE_URL + '/account/register',
    locker: BASE_URL + '/locker',
    blockLocker: BASE_URL + '/locker/block/{id}',
    unblockLocker: BASE_URL + '/locker/unblock/{id}',
    data: BASE_URL + '/data',
    backup: BASE_URL + '/data/backup',
    tool: BASE_URL + '/tool',
    servicebook: BASE_URL + '/servicebook',
    service: BASE_URL + '/service',
    user: BASE_URL + '/user',
    notification: BASE_URL + '/accounting/notification',
    accountingReport: BASE_URL + '/accounting/reports/accounting',
    serviceReport: BASE_URL + '/accounting/reports/service',
    violationReport: BASE_URL + '/accounting/reports/violation',
  },
  ua_version: 'http://localhost:4201',
  en_version: 'http://localhost:4202',
};