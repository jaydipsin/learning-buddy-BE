import { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";
export interface JwtPayload extends DefaultJwtPayload {
  _id: string;
  email: string;
  role: string;
}
