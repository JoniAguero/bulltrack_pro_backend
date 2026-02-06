import { Bull, BullCoat, BullOrigin, BullUse } from '../entities/bull.entity';

export interface BullFilters {
    search?: string; // caravana or nombre
    minAge?: number;
    maxAge?: number;
    origen?: BullOrigin;
    uso?: BullUse;
    pelaje?: BullCoat;
}

export interface PaginationParams {
    page: number;
    limit: number;
}

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    lastPage: number;
}

export interface IBullRepository {
    findAll(filters: BullFilters, pagination: PaginationParams, sort?: { sortBy: string; order: 'asc' | 'desc' }, userId?: number): Promise<PaginatedResult<Bull>>;
    findById(id: number): Promise<Bull | null>;
    // Future methods: findByIds, etc.
}
