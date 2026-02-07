import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaBullRepository } from './prisma/repositories/prisma-bull.repository';

export const BULL_REPOSITORY_TOKEN = 'BULL_REPOSITORY_TOKEN';
export const FAVORITE_REPOSITORY_TOKEN = 'FAVORITE_REPOSITORY_TOKEN';

import { PrismaFavoriteRepository } from './prisma/repositories/prisma-favorite.repository';

@Module({
    imports: [PrismaModule],
    providers: [
        {
            provide: BULL_REPOSITORY_TOKEN,
            useClass: PrismaBullRepository,
        },
        {
            provide: FAVORITE_REPOSITORY_TOKEN,
            useClass: PrismaFavoriteRepository,
        },
    ],
    exports: [BULL_REPOSITORY_TOKEN, FAVORITE_REPOSITORY_TOKEN],
})
export class RepositoriesModule { }
