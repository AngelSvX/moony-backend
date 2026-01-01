import { IsEmail, IsNumber, IsString } from "class-validator";

export class GetUserDto {
    @IsNumber()
    id: number;
    
    @IsEmail()
    email: string;

    @IsString()
    full_name: string;

    @IsString()
    avatar_url: string | null;

    @IsString()
    role: string;

    @IsNumber()
    is_active: number | null;

    @IsNumber()
    email_verified: number | null;

}