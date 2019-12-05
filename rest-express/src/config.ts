require('dotenv').config();

export const PUSHER_APP_ID = process.env.PUSHER_APP_ID || '';
export const PUSHER_KEY = process.env.PUSHER_KEY || '';
export const PUSHER_SECRET = process.env.PUSHER_SECRET || '';
export const PUSHER_CLUSTER = process.env.PUSHER_CLUSTER || '';
export const AUTH0_DOMAIN =
  process.env.AUTH0_DOMAIN || 'https://davidy.au.auth0.com';
export const AUTH0_AUDIENCE =
  process.env.AUTH0_AUDIENCE || 'react-express-base-app';
