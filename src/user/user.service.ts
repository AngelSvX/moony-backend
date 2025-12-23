import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { DrizzleService } from 'src/db/drizzle.service';
import { users } from 'src/db/schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(
    private drizzle: DrizzleService
  ) {}

  async create(createUserDto: CreateUserDto) {

    const exist = await this.drizzle.db.select().from(users).where(eq(users.email, createUserDto.email))

    if(exist.length > 0){
      throw new ConflictException("Email already exist")
    }

    const userHashed: CreateUserDto = createUserDto

    const passwordHashed = await bcrypt.hash(createUserDto.password_hash, 10)

    userHashed.password_hash = passwordHashed

    const user = await this.drizzle.db.insert(users).values(userHashed)

    return user
  }

  async findAll() {
    const data = await this.drizzle.db.select({
      id: users.id,
      email: users.email,
      full_name: users.full_name,
      avatar_url: users.avatar_url,
      role: users.role,
      is_active: users.is_active,
      email_verified: users.email_verified
    }).from(users)
    return data
  }

  async findOne(id: number) {
    const user = await this.drizzle.db.select({
      id: users.id,
      email: users.email,
      full_name: users.full_name,
      avatar_url: users.avatar_url,
      role: users.role,
      is_active: users.is_active,
      email_verified: users.email_verified
    }).from(users).where((eq(users.id, id)))

    if(!user){
      throw new NotFoundException('Usuario no existente')
    }

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.drizzle.db.select().from(users).where(eq(users.id, id))
    if(!user){
      throw new NotFoundException('Usuario no encontrado')
    }
    return this.drizzle.db.update(users).set(updateUserDto).where(eq(users.id, id))
  }

  async remove(id: number) {
    return await this.drizzle.db.delete(users).where(eq(users.id, id))
  }
}
