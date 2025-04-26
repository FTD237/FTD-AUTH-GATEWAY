import { Request } from "express";

export interface AppInfo {
  appName: string;
  permissions: string[];
}

export interface ApiKeys {
  [key: string]: AppInfo;
}

export interface AuthenticatedRequest extends Request {
  appInfo?: AppInfo;
}

export interface JwtPayload {
  service: string;
  exp: number;
  iat: number;
}
