import { Inject } from "@nestjs/common";
import { UserRepository } from "src/user/domain/repositories/user.repository";
import { GetUserDto } from "src/user/presentation/dto/get-user-dto";

export class FindAllUsersUseCase {
 constructor(
    @Inject(UserRepository)
    private readonly userRepo: UserRepository,
 ){}

 async execute(): Promise<GetUserDto[]>{
    return await this.userRepo.findAll()
 }

}