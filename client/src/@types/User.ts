export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}
