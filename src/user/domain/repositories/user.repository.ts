import { GetUserDto } from 'src/user/presentation/dto/get-user-dto';
import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAll(): Promise<User[] | null>;
  abstract findById(id: number): Promise<GetUserDto>
  abstract update(user: User): Promise<void>;
  abstract delete(id: number): Promise<void>;
}
