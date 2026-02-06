import { Inject, Injectable } from '@nestjs/common';
import type { IFavoriteRepository } from '../../domain/repositories/favorite.repository.interface';
import { FAVORITE_REPOSITORY_TOKEN } from '../../infrastructure/persistence/repositories.module';

@Injectable()
export class AddFavoriteUseCase {
    constructor(
        @Inject(FAVORITE_REPOSITORY_TOKEN)
        private readonly favoriteRepository: IFavoriteRepository,
    ) { }

    async execute(userId: number, bullId: number): Promise<void> {
        return this.favoriteRepository.add(userId, bullId);
    }
}
