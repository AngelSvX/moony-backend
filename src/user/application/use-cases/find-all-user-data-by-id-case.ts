import { Inject } from "@nestjs/common";
import { User } from "src/user/domain/entities/user.entity";
import { UserRepository } from "src/user/domain/repositories/user.repository";

export class FindAllUserByIdUseCase{
    constructor(
        @Inject(UserRepository)
        private readonly userRepo: UserRepository
    ){}

    async execute(id: number) : Promise<User>{
        return await this.userRepo.findAllById(id)
    }

}