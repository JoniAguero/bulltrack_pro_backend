import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginUseCase } from '../../../application/use-cases/login.use-case';

@Controller('auth')
export class AuthController {
    constructor(private readonly loginUseCase: LoginUseCase) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: Record<string, any>) {
        // Simple validation inline for now, or assume DTO
        if (!loginDto.email || !loginDto.password) {
            throw new Error('Email and password are required');
        }
        return this.loginUseCase.execute(loginDto.email, loginDto.password);
    }
}
