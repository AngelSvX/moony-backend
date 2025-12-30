import { ConflictException, Inject } from "@nestjs/common";
import { UserRepository } from "src/user/domain/repositories/user.repository";
import bcrypt from 'bcrypt';
import { User } from "src/user/domain/entities/user.entity";

export class CreateUserUseCase {
    constructor(
        @Inject(UserRepository)
        private readonly userRepo: UserRepository
    ){}

    async execute( data : {
        email: string;
        password: string;
        full_name: string;
        avatar_url: string;
        role: string;
    }){
        const exist = await this.userRepo.findByEmail(data.email);

        if(exist){
            throw new ConflictException('Email already exists')
        }

        const hash = await bcrypt.hash(data.password, 10);

        const user = new User(
            null,
            data.email,
            hash,
            data.full_name,
            data.avatar_url,
            data.role,
            1,
            0,
        );
        
        await this.userRepo.create(user)
    }
}