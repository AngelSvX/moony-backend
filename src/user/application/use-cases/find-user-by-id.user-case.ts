import { Inject } from '@nestjs/common';
import { UserRepository } from 'src/user/domain/repositories/user.repository';
import { GetUserDto } from 'src/user/presentation/dto/get-user-dto';

export class FindUserByIdUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepo: UserRepository,
  ) { }

  async execute(id: number): Promise<GetUserDto> {
    return await this.userRepo.findById(id);
  }
}
