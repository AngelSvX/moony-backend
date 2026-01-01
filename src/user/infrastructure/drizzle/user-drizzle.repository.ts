import { Inject } from '@nestjs/common';
import { eq, SelectedFields } from 'drizzle-orm';
import { DrizzleService } from 'src/db/drizzle.service';
import { users } from 'src/db/schema';
import { User } from 'src/user/domain/entities/user.entity';
import { UserRepository } from 'src/user/domain/repositories/user.repository';
import { GetUserDto } from 'src/user/presentation/dto/get-user-dto';

export class UserDrizzleRepository implements UserRepository {
  constructor(
    @Inject(DrizzleService)
    private readonly drizzle: DrizzleService
  ) { }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.drizzle.db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (result.length === 0) {
      return null;
    }

    const u = result[0];

    return new User(
      u.id,
      u.email,
      u.password_hash,
      u.full_name,
      u.avatar_url as string,
      u.role,
      u.is_active as number,
      u.email_verified as number
    );
  }

  async create(user: User): Promise<void> {
    await this.drizzle.db.insert(users).values({
      email: user.email,
      password_hash: user.password_hash,
      full_name: user.full_name,
      avatar_url: user.avatar_url,
      role: user.role,
      is_active: user.is_active,
      email_verified: user.email_verified
    })
  }

  async findAll(): Promise<GetUserDto[]> {
    const result = await this.drizzle.db.select({
      id: users.id,
      email: users.email,
      full_name: users.full_name,
      avatar_url: users.avatar_url,
      role: users.role,
      is_active: users.is_active,
      email_verified: users.email_verified,
    }).from(users)
    return result;
  }

  async findById(id: number): Promise<GetUserDto> {
    const [user] = await this.drizzle.db.select({
      id: users.id,
      email: users.email,
      full_name: users.full_name,
      avatar_url: users.avatar_url,
      role: users.role,
      is_active: users.is_active,
      email_verified: users.email_verified,
    }).from(users).where(eq(users.id, id))

    if (!user) {
      throw new Error('User not found')
    }

    return user;
  }

  async delete(id: number): Promise<void> {
    await this.drizzle.db.delete(users).where(eq(users.id, id))
  }

  async update(user: User): Promise<void> {

  }

  async findAllById(id: number): Promise<User> {
    const result = await this.drizzle.db.select().from(users).where(eq(users.id, id))

    if (!result) {
      throw new Error('User not found')
    }

    const u = result[0]

    return new User(
      u.id,
      u.email,
      u.password_hash,
      u.full_name,
      u.avatar_url,
      u.role,
      u.is_active,
      u.email_verified
    )
  }

}
