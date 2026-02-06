import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './infrastructure/auth/auth.module';
import { PrismaModule } from './infrastructure/persistence/prisma/prisma.module';
import { RepositoriesModule } from './infrastructure/persistence/repositories.module';
import { FavoritesModule } from './infrastructure/modules/favorites.module';
import { BullsController } from './infrastructure/http/controllers/bulls.controller';
import { GetBullsUseCase } from './application/use-cases/get-bulls.use-case';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    RepositoriesModule,
    FavoritesModule,
  ],
  controllers: [BullsController],
  providers: [GetBullsUseCase],
})
export class AppModule { }
