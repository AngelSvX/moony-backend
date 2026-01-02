import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/commons/guards/auth.guard';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { FindUserByIdUseCase } from '../application/use-cases/find-user-by-id.user-case';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUsersUseCase } from '../application/use-cases/find-all-users.use-case';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.use-case';
import { FindAllUserByIdUseCase } from '../application/use-cases/find-all-user-data-by-id-case';
import { UpdateUserUseCase } from '../application/use-cases/update-user.use-case';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    private readonly createUserCase: CreateUserUseCase,
    private readonly findUserByIdCase: FindUserByIdUseCase,
    private readonly findAllUsersCase: FindAllUsersUseCase,
    private readonly deleteUserCase: DeleteUserUseCase,
    private readonly findAllUserDataCase: FindAllUserByIdUseCase,
    private readonly updateUserCase: UpdateUserUseCase
  ) { }

  @Post('/add')
  async create(@Body() dto: CreateUserDto) {
    await this.createUserCase.execute({
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

  @Get("/all")
  async getAllUsers() {
    const users = await this.findAllUsersCase.execute()
    return {
      success: true,
      message: "Users found successfully",
      users: users
    }
  }

  @Delete(":id")
  async deleteUserById(@Param('id') id: number) {
    await this.deleteUserCase.execute(id)

    return {
      success: true,
      message: "User deleted successfully"
    }

  }

  @Patch(":id")
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto){
    await this.updateUserCase.execute(id, updateUserDto)

    return{
      success: true,
      message: "User was updated successfully"
    }
  }

  @Get(":id")
  async getUserById(@Param("id") id: number) {
    const user = await this.findUserByIdCase.execute(id)

    return {
      success: true,
      message: "User found successfully",
      user: user
    }
  }

  @Get("/all/:id")
  async getAllUserDataById(@Param("id") id: number) {
    const user = await this.findAllUserDataCase.execute(id)

    return {
      success: true,
      message: "User found succesfully",
      user: user
    }
  }
}
