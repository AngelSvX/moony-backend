import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthSignInDTO } from './dto/auth-signIn.dto';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { DrizzleService } from 'src/db/drizzle.service';
import { users } from 'src/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
  constructor(
    private drizzle: DrizzleService,
    private jwtService: JwtService,
  ){}

  async validate(createAuthDto: AuthSignInDTO) {

    const [user] = await this.drizzle.db.select({
      id: users.id,
      full_name: users.full_name,
      email: users.email,
      password_hash: users.password_hash,
      role: users.role
    }).from(users).where(eq(users.email, createAuthDto.email))

    if(!user){
      throw new NotFoundException("El usuario no existe")
    }

    const isMatch = await bcrypt.compare(createAuthDto.password_hash, user.password_hash)

    if(!isMatch){
      throw new UnauthorizedException("Contraseña Incorrecta")
    }

    const payload = {full_name: user.full_name, email: user.email, role: user.role}

    const token = await this.jwtService.signAsync(payload)

    return {
      response: token
    }
  }
}
