import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { DrizzleModule } from 'src/db/drizzle.module';

@Module({
  imports: [UserModule, DrizzleModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
