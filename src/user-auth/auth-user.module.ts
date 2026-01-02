import { Module } from "@nestjs/common";
import { DrizzleModule } from "src/db/drizzle.module";
import { AuthRepository } from "./domain/repositories/auth-user.repository";
import { ValidateUserUseCase } from "./application/use-cases/validate-user.use-case";
import { AuthUserController } from "./presentation/auth-user.controller";
import { AuthDrizzleRepository } from "./infrastructure/drizzle/auth-drizzle.repository";

@Module({
    imports: [DrizzleModule],
    controllers: [AuthUserController],
    providers: [
        {
            provide: AuthRepository,
            useClass: AuthDrizzleRepository
        },
        ValidateUserUseCase
    ]
})

export class UserAuthModule {}