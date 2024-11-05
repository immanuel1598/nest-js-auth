import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    return await this.userRepo.save(user);
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async findOne(id: number) {
    return await this.userRepo.findOne({
      where: {
        id,
      },
      select: ['id', 'username', 'email', 'hashedRefreshToken', 'role'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepo.delete(id);
  }

  async findByEmail(email: string) {
    return await this.userRepo.findOne({
      where: {
        email,
      },
    });
  }
  async updateHashedRefreshToken(userId: number, hashedRefreshToken: string) {
    return await this.userRepo.update({ id: userId }, { hashedRefreshToken });
  }
}
