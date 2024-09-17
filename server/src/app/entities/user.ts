import { BaseEntity } from './base-entity';
// import { Role } from './roles'; // Import enum Role

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

interface UserProps {
  name: string;
  email: string;
  password?: string;
  refreshToken?: string | null;
  role?: Role;
}

export class User extends BaseEntity<UserProps> {
  constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  public get name() {
    return this.props.name;
  }

  public get email() {
    return this.props.email;
  }

  public get password() {
    return this.props.password;
  }

  public get refreshToken(): string | null {
    return this.props.refreshToken ?? null;
  }

  public get role(): Role {
    return this.props.role ?? Role.USER; // Mặc định là USER
  }
}
