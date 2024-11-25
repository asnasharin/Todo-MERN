import { cleanEnv, str, port } from "envalid";

// validasting and accessing environment variables
export const env = cleanEnv(process.env, {
  PORT: port(),
  MONGO_URI: str(),
  JWT_SECRET: str(),
  ENVIRONMENT: str(),
  FRONTENT_URL: str(),
  FRONTENT_URL_DEPLOYED: str(),
});