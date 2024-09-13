import { client } from "../config/db.config.js";
import { CACHE_TTL } from "../config/constants.js";

export async function getCache(key) {
  if (process.env.NODE_ENV === "production") {
    return await client.get(key);
  }
  return null;
}

export async function setCache(key, value) {
  if (process.env.NODE_ENV === "production") {
    return await client.set(key, value, { EX: CACHE_TTL });
  }
  return null;
}
