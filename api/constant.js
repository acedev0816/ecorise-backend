import dotenv from 'dotenv';

dotenv.config();

export const API_KEY = process.env.API_KEY;
export const NET_ENV = process.env.STAGING? 'staging' : 'www';

export const POLYGON_COLLECTION_ID = "be12b4b4-9c6f-42c2-ad57-6df8fa67c173"
export const ENVIRONMENT = process.env.ENVIRONMENT || "develop"