import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {

    const exist = await this.userRepo.findOne({
      where: {email: createUserDto.email}
    })

    if(exist){
      throw new ConflictException("Email already exist")
    }

    const user = this.userRepo.create(createUserDto)
    
    return this.userRepo.save(user)
  }

  async findAll() {
    const users = await this.userRepo.find()
    return users
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({id})

    if(!user){
      throw new NotFoundException('Usuario no existente')
    }

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOneBy({id})
    if(!user){throw new NotFoundException('Usuario no encontrado')}

    this.userRepo.merge(user, updateUserDto)

    return await this.userRepo.save(user) 

  }

  async remove(id: number) {
    return await this.userRepo.delete(id)
  }
}
