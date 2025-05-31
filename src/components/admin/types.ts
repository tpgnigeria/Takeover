export enum AdminRoles {
  SUPER = 'super',
  ADMIN = 'admin',
}

export interface TokenResponse {
  email: string;
  role: AdminRoles;
  accessToken: string;
}