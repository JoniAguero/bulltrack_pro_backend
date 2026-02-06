import { Inject, Injectable } from '@nestjs/common';
import type { IBullRepository, PaginatedResult } from '../../domain/repositories/bull.repository.interface';
import { Bull } from '../../domain/entities/bull.entity';
import { BULL_REPOSITORY_TOKEN } from '../../infrastructure/persistence/repositories.module';

@Injectable()
export class GetBullsUseCase {
    constructor(
        @Inject(BULL_REPOSITORY_TOKEN)
        private readonly bullRepository: IBullRepository,
    ) { }

    async execute(
        filters: import('../../domain/repositories/bull.repository.interface').BullFilters = {},
        pagination: import('../../domain/repositories/bull.repository.interface').PaginationParams = { page: 1, limit: 10 },
        sort?: { sortBy: string; order: 'asc' | 'desc' },
        userId?: number
    ): Promise<PaginatedResult<Bull>> {
        return this.bullRepository.findAll(filters, pagination, sort, userId);
    }
}
