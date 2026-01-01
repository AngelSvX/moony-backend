import { Inject } from "@nestjs/common";
import { UserRepository } from "src/user/domain/repositories/user.repository";

export class DeleteUserUseCase {
    constructor(
        @Inject(UserRepository)
        private readonly userRepository: UserRepository
    ){}

    async execute(id: number){
        await this.userRepository.delete(id)
    }
}