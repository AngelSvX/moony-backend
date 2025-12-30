import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { FindUserByIdUseCase } from '../application/use-cases/find-user-by-id.user-case';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly findUserById: FindUserByIdUseCase
  ) { }

  @Post('/add')
  async create(@Body() dto: CreateUserDto) {
    await this.createUser.execute({
      email: dto.email,
      password: dto.password_hash,
      full_name: dto.full_name,
      avatar_url: dto.avatar_url,
      role: dto.role
    })

    return {
      success: true,
      message: "The user was added successfully"
    }

  }

  @Get(":id")
  async getUserById(@Param("id") id: number) {
    const user = await this.findUserById.execute(id)

    return {
      success: true,
      message: "User found successfully",
      user: user
    }
  }

}
