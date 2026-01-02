import { IsEmail, IsString } from "class-validator";

export class AuthSignInDTO {
  @IsEmail()
  email: string;

  @IsString()
  password_hash: string;
}
