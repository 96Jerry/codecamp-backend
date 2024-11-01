import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create({ email, password, name, age }) {
    const user = await this.userRepository.findOneBy({ email });
    if (user) throw new ConflictException('이미 등록된 이메일입니다.');

    return await this.userRepository.save({ email, password, name, age });
  }
}
