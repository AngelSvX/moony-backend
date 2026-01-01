import { Inject, NotFoundException } from "@nestjs/common";
import { User } from "src/user/domain/entities/user.entity";
import { UserRepository } from "src/user/domain/repositories/user.repository";

export class UpdateUserUseCase{
    constructor(
        @Inject()
        private readonly userRepo: UserRepository
    ){}

    async execute(id: number): Promise<NotFoundException | void>{
        const user = await this.userRepo.findAllById(id);

        if(!user){
            return new NotFoundException("User not found")
        }

        await this.userRepo.update(user)

    }

}