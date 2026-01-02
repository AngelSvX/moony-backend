import { AuthSignInDTO } from "src/user-auth/presentation/dto/auth-user-signin.dto";

export abstract class AuthRepository {
    abstract validate(authPayload: AuthSignInDTO): Promise<{
        response: string
    }>
}