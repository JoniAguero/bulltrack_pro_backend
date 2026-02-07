import { Controller, Post, Body, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { LoginUseCase } from '../../../application/use-cases/login.use-case';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private readonly loginUseCase: LoginUseCase) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: Record<string, any>) {
        this.logger.log(`Login attempt for email: ${loginDto.email}`);
        if (!loginDto.email || !loginDto.password) {
            throw new Error('Email and password are required');
        }
        return this.loginUseCase.execute(loginDto.email, loginDto.password);
    }
}
