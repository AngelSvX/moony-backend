import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthSignInDTO } from './dto/auth-signIn.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService
  ){}

  validate(createAuthDto: AuthSignInDTO) {
    const user = this.userRepo.findOne({
      where: {email: createAuthDto.email},
      select: ['id', 'full_name', 'email']
    })

    if(!user){
      throw new NotFoundException("El usuario no existe")
    }

  }
}
