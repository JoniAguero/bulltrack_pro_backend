import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from '../http/controllers/auth.controller';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from '../persistence/prisma/prisma.module';
import { Global } from '@nestjs/common';

@Global()
@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'super-secret-key-change-in-prod',
            signOptions: { expiresIn: '1d' },
        }),
        PrismaModule,
        ConfigModule,
    ],
    controllers: [AuthController],
    providers: [LoginUseCase, JwtStrategy],
    exports: [LoginUseCase, JwtStrategy, PassportModule, JwtModule],
})
export class AuthModule { }
