import dotenv from 'dotenv';

dotenv.config();

export const API_KEY = process.env.API_KEY;
export const NET_ENV = process.env.STAGING? 'staging' : 'www';

export const POLYGON_COLLECTION_ID = "6103a9d9-d9b9-4509-9de7-77688a75a9a7"

export const ENVIRONMENT = process.env.ENVIRONMENT || "develop"