import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthSignInDTO } from './dto/auth-signIn.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService
  ){}

  async validate(createAuthDto: AuthSignInDTO) {
    const user = await this.userRepo.findOne({
      where: {email: createAuthDto.email},
      select: ['id', 'full_name', 'email', "password_hash", "role"]
    })

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
