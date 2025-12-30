import { IsEmail, IsNumber, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  password_hash: string;

  @IsString()
  full_name: string;

  @IsString()
  avatar_url: string;

  @IsString()
  role: string;

  @IsNumber()
  is_active: number

  @IsNumber()
  email_verified: number

}
