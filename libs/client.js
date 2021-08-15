// libs/client.js
import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'blog',
  apiKey: process.env.API_KEY,
});