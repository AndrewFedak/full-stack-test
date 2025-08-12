import { ConflictException, UnauthorizedException } from "../../exceptions/HttpException";
import { hashPassword, comparePassword } from "../../utils/crypto";
import { generateToken } from "../../utils/jwt";
import { validate } from "../../utils/validate";

import { UserResponse, LoginResponse, UserResponseDto, LoginResponseDto } from "./dtos/auth.dto";

import { IAuthRepository } from "./auth.repository";

export class AuthService {
  constructor(private readonly authRepository: IAuthRepository) {}

  public async register(email: string, password: string): Promise<UserResponse> {
    const existing = await this.authRepository.findUserByEmail(email);
    if (existing) throw new ConflictException("User already exists");

    const hashedPassword = await hashPassword(password);
    const user = await this.authRepository.createUser(email, hashedPassword);

    return validate(UserResponseDto, user);
  }

  public async login(email: string, password: string): Promise<LoginResponse> {
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) throw new UnauthorizedException("Invalid credentials");

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) throw new UnauthorizedException("Invalid credentials");

    const token = generateToken(user.id);

    return validate(LoginResponseDto, { token });
  }
}
