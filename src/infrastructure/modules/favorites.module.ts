import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../persistence/repositories.module';
import { FavoritesController } from '../http/controllers/favorites.controller';
import { AddFavoriteUseCase } from '../../application/use-cases/add-favorite.use-case';
import { RemoveFavoriteUseCase } from '../../application/use-cases/remove-favorite.use-case';
import { GetUserFavoritesUseCase } from '../../application/use-cases/get-user-favorites.use-case';

@Module({
    imports: [RepositoriesModule],
    controllers: [FavoritesController],
    providers: [
        AddFavoriteUseCase,
        RemoveFavoriteUseCase,
        GetUserFavoritesUseCase,
    ],
})
export class FavoritesModule { }
