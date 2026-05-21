export interface RegisterResponse {
  name: string;
  email: string;
  activated: boolean;
}

export interface AuthenticationToken {
  token: string;
  expiry: string;
}

export interface LoginResponse {
  authentication_token: AuthenticationToken;
}
