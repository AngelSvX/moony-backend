import { Controller, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDTO } from './dto/auth-signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  auth(@Body() authUserDTO: AuthSignInDTO) {
    return this.authService.validate(authUserDTO);
  }
  
}
