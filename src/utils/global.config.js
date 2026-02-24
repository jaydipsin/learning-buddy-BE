import dotenv from "dotenv";

dotenv.config();

const JWT_REFRESH_SECRET_KEY =
	process.env.JWT_REFRESH_SECRET_KEY || process.env.JWT_REFRESH_SECRETS_KEY;
const JWT_ACCESS_SECRET_KEY =
	process.env.JWT_ACCESS_SECRET_KEY || process.env.JWT_ACCESS_SECRETS_KEY;

export { JWT_ACCESS_SECRET_KEY, JWT_REFRESH_SECRET_KEY };
