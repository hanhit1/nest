import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from './user.entity';
import { createUser} from './dto/create-user.dto';
import { updateUser } from './dto/update-user.dto';
import {User } from './interface/user.interface'
@Injectable()
export class UsersService {
  constructor( @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}
  async create(userDto: createUser): Promise<User> {
    const newUser = this.userRepository.create(userDto);
    return this.userRepository.save(newUser);
  }
 
  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async getById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }
  async delete(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected > 0;
  }

  async update(id: number, user: updateUser): Promise<boolean> {
    const result = await this.userRepository.update(id, user);
    return result.affected > 0;
  }
}