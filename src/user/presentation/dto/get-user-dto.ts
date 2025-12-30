import { IsEmail, IsNumber, IsString } from "class-validator";

export class GetUserDto {
    @IsNumber()
    id: number;
    
    @IsEmail()
    email: string;

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