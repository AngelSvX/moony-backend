import { Inject, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { eq } from "drizzle-orm";
import { DrizzleService } from "src/db/drizzle.service";
import { users } from "src/db/schema";
import { AuthRepository } from "src/user-auth/domain/repositories/auth-user.repository";
import { AuthSignInDTO } from "src/user-auth/presentation/dto/auth-user-signin.dto";

export class AuthDrizzleRepository implements AuthRepository {

    constructor(
        @Inject(DrizzleService)
        private readonly drizzle: DrizzleService,
        private jwtService: JwtService
    ) { }

    async validate(authPayload: AuthSignInDTO): Promise<{response:string}> {
        const [user] = await this.drizzle.db.select({
            id: users.id,
            full_name: users.full_name,
            email: users.email,
            password_hash: users.password_hash,
            role: users.role
        }).from(users).where(eq(users.email, authPayload.email))

        if (!user) {
            throw new NotFoundException("User doesn't exist")
        }

        const isMatch = await bcrypt.compare(authPayload.password_hash, user.password_hash)

        if (!isMatch) {
            throw new UnauthorizedException("Wrong Password")
        }

        const payload = { full_name: user.full_name, email: user.email, role: user.role }

        const token = await this.jwtService.signAsync(payload)

        return {
            response: token
        }

    }
}