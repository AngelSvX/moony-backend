import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/db/drizzle.module';
import { UserRepository } from './domain/repositories/user.repository';
import { UserDrizzleRepository } from './infrastructure/drizzle/user-drizzle.repository';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { UserController } from './presentation/user.controller';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id.user-case';
import { FindAllUsersUseCase } from './application/use-cases/find-all-users.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';
import { FindAllUserByIdUseCase } from './application/use-cases/find-all-user-data-by-id-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';

@Module({
  imports: [DrizzleModule],
  controllers: [UserController],
  providers: [
    {
    provide: UserRepository,
    useClass: UserDrizzleRepository
  },
  CreateUserUseCase,
  FindUserByIdUseCase,
  FindAllUsersUseCase,
  DeleteUserUseCase,
  FindAllUserByIdUseCase,
  UpdateUserUseCase
],
})
export class UserModule {}
