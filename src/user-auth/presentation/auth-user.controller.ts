import { Body, Controller, Post } from "@nestjs/common";
import { AuthSignInDTO } from "./dto/auth-user-signin.dto";
import { ValidateUserUseCase } from "../application/use-cases/validate-user.use-case";

@Controller('auth')
export class AuthUserController{
    constructor(
        private readonly validateUserCase: ValidateUserUseCase
    ){}

    @Post()
    validate(@Body() authPayload: AuthSignInDTO){
        return this.validateUserCase.execute(authPayload)
    }

}