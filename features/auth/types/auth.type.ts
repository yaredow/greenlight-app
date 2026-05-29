export interface RegisterResponse {
  name: string;
  email: string;
  activated: boolean;
}

export interface AuthenticationToken {
  token: string;
  expiry: string;
}

export interface RefreshToken {
  token: string;
  expires_at: string;
}

export interface LoginResponse {
  authentication_token: AuthenticationToken;
  refresh_token: RefreshToken;
}

export interface RefreshResponse {
  access_token: AuthenticationToken;
  refresh_token: RefreshToken;
}
