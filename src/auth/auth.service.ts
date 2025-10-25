import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/signUp.dto';
import { LogInDto } from './dto/logIn.dto';
import { JwtPayload } from './dto/jwt.dto';
import { UserRole } from '../utils/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly em: EntityManager,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    // Check if user already exists
    const existingUser = await this.em.findOne(User, {
      $or: [{ email: createUserDto.email }, { phone: createUserDto.phone }],
    });

    if (existingUser) {
      throw new Error('User with this email or phone already exists');
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    // Create new user with default USER role
    const user = this.em.create(User, {
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      gender: createUserDto.gender,
      dob: createUserDto.dob ? new Date(createUserDto.dob) : undefined,
      email: createUserDto.email,
      password: hashedPassword,
      phone: createUserDto.phone,
      religion: createUserDto.religion,
      localAddress: createUserDto.localAddress,
      nationality: createUserDto.nationality,
      bloodGroup: createUserDto.bloodGroup,
      studentId: createUserDto.studentId,
      role: UserRole.USER, // Explicitly set the role
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.em.persistAndFlush(user);

    // Generate JWT token
    const payload: JwtPayload = {
      sub: user.id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async logIn(logInDto: LogInDto): Promise<{ accessToken: string }> {
    const { email, password } = logInDto;

    // Find user by email
    const user = await this.em.findOne(User, { email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload: JwtPayload = {
      sub: user.id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async validateUserById(userId: string): Promise<User | null> {
    return await this.em.findOne(User, { id: Number(userId) });
  }

  async findById(userId: number): Promise<User | null> {
    return await this.em.findOne(User, { id: userId });
  }
}