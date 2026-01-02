import { Inject } from "@nestjs/common";
import { AuthRepository } from "src/user-auth/domain/repositories/auth-user.repository";
import { AuthSignInDTO } from "src/user-auth/presentation/dto/auth-user-signin.dto";

export class ValidateUserUseCase{
    constructor(
        @Inject(AuthRepository)
        private readonly authRepo: AuthRepository
    ){}

    async execute(authPayload: AuthSignInDTO): Promise<{response:string}>{
        return await this.authRepo.validate(authPayload)
    }

}