export interface CredencialDto {
  id: number;
  name: string;
  login: string;
  email: string;
  roles: Array<string>;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  refreshExpiresIn: number;
  statusAtivo: boolean;
}
