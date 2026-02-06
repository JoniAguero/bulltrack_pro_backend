import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from '../http/controllers/auth.controller';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from '../persistence/prisma/prisma.module'; // Import database connection

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '1h' },
            }),
            inject: [ConfigService],
        }),
        PrismaModule,
        ConfigModule, // Ensure ConfigModule is available
    ],
    controllers: [AuthController],
    providers: [LoginUseCase, JwtStrategy],
    exports: [LoginUseCase],
})
export class AuthModule { }
