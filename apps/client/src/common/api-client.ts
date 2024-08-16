import { APIContract } from '@mono-repo/ts-rest';
import { initClient } from '@ts-rest/core';

const apiClient = initClient(
  {
    ...APIContract,
  },
  {
    baseHeaders: {},
    baseUrl: 'http://localhost:3000',
  },
);

export default apiClient;
