import { Inject, NotFoundException } from "@nestjs/common";
import { User } from "src/user/domain/entities/user.entity";
import { UserRepository } from "src/user/domain/repositories/user.repository";
import { UpdateUserDto } from "src/user/presentation/dto/update-user.dto";

export class UpdateUserUseCase{
    constructor(
        @Inject()
        private readonly userRepo: UserRepository
    ){}

    async execute(id: number, updateUserDto: UpdateUserDto): Promise<void>{
        const user = await this.userRepo.findAllById(id);

        if(!user){
            throw new NotFoundException("User not found")
        }

        if(updateUserDto.email !== undefined){user.email = updateUserDto.email}
        if(updateUserDto.avatar_url !== undefined){user.avatar_url = updateUserDto.avatar_url}
        if(updateUserDto.full_name !== undefined){user.full_name = updateUserDto.full_name}

        await this.userRepo.update(user)

    }

}