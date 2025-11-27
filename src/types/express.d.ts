export interface JwtPayloadType {
  id: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayloadType;
    }
  }
}
