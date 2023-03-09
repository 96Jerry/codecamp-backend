import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create({ createUserInput }) {
    const { email, ...userInput } = createUserInput;
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('이미 등록된 이메일 입니다.');
    }

    return await this.userRepository.save({ ...createUserInput });
  }

  // 삭제
  async delete({ userId }) {
    const result = await this.userRepository.softDelete({ id: userId });
    return result.affected ? true : false;
  }

  // 조회
  async findAll() {
    return await this.userRepository.find();
  }

  async findOne({ productId }) {
    return await this.userRepository.findOne({ where: { id: productId } });
  }
  // 수정

  async update({ userId, updateUserInput }) {
    return await this.userRepository.save({
      id: userId,
      ...updateUserInput,
    });
  }
}
