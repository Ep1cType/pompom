export interface SignInPayload {
  identifier: string;
  password: string;
}

export interface RefreshTokenPayload {
  jwt: string;
  refreshToken: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SignInResponse {
  jwt: string;
  user: User;
}

export interface SignInError {
  data: {};
  error: Error;
}

interface Error {
  status: number;
  name: string;
  message: string;
  details: {};
}
