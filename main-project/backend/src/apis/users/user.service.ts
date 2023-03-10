import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bycrpt from 'bcrypt';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create({ ...createUserInput }) {
    const { email } = createUserInput;
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('이미 등록된 이메일 입니다.');
    }
    createUserInput.password = await bycrpt.hash(createUserInput.password, 10);
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

  async findOnewithId({ userId }) {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async findOneWithEmail({ email }) {
    return await this.userRepository.findOneBy({ email });
  }
  // 수정

  async update({ userId, updateUserInput }) {
    return await this.userRepository.save({
      id: userId,
      ...updateUserInput,
    });
  }

  async updateloginPwd({ userId, changePwd }) {
    const hashedPwd = await bycrpt.hash(changePwd, 10);
    const result = await this.userRepository.update(
      { id: userId },
      { password: hashedPwd },
    );
    return result.affected ? true : false;
  }
}
