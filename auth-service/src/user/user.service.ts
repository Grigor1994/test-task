import {
  ConflictException,
  Inject,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}
  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    const user = await this.userRepository.save(createUser);
    if (!user) {
      throw new HttpException('Can not create user', HttpStatus.FORBIDDEN);
    }

    return this.authService.generateAccessToken(user);
  }
}
