import { Rol } from './rol.model';

export interface Usuario {
  id: number;
  username: string;
  email: string;
  roles: Rol[];
}
