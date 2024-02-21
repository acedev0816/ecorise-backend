import dotenv from 'dotenv';

dotenv.config();

export const API_KEY = process.env.API_KEY;
export const NET_ENV = process.env.STAGING? 'staging' : 'www';