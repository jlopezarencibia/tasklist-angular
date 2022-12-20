import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'App',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44354/',
    redirectUri: baseUrl,
    clientId: 'App_App',
    responseType: 'code',
    scope: 'offline_access App',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://localhost:44354',
      rootNamespace: 'TaskList.App',
    },
  },
} as Environment;