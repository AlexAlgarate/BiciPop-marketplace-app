export interface UserDto {
  id: string;
  email: string;
}

export interface AuthUser {
  id: string;
  email: string;
  passwordHash: string;
}
