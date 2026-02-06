import { Inject, Injectable } from '@nestjs/common';
import type { IFavoriteRepository } from '../../domain/repositories/favorite.repository.interface';
import { FAVORITE_REPOSITORY_TOKEN } from '../../infrastructure/persistence/repositories.module';
import { Bull } from '../../domain/entities/bull.entity';

@Injectable()
export class GetUserFavoritesUseCase {
    constructor(
        @Inject(FAVORITE_REPOSITORY_TOKEN)
        private readonly favoriteRepository: IFavoriteRepository,
    ) { }

    async execute(userId: number): Promise<Bull[]> {
        return this.favoriteRepository.findByUserId(userId);
    }
}
