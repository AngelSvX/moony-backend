import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/db/drizzle.module';
import { UserRepository } from './domain/repositories/user.repository';
import { UserDrizzleRepository } from './infrastructure/drizzle/user-drizzle.repository';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { UserController } from './presentation/user.controller';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id.user-case';

@Module({
  imports: [DrizzleModule],
  controllers: [UserController],
  providers: [
    {
    provide: UserRepository,
    useClass: UserDrizzleRepository
  },
  CreateUserUseCase,
  FindUserByIdUseCase
],
})
export class UserModule {}
