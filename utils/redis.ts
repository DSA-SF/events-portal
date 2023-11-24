import Redis from "ioredis";
const redis = new Redis(process.env.REDIS_URL || "MISSING_REDIS_URL_ENV");

export default redis;
