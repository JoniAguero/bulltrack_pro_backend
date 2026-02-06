import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IBullRepository, BullFilters, PaginationParams, PaginatedResult } from '../../../../domain/repositories/bull.repository.interface';
import { Bull } from '../../../../domain/entities/bull.entity';
import { BullMapper } from '../mappers/bull.mapper';

import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaBullRepository implements IBullRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findAll(filters: BullFilters, pagination: PaginationParams, sort?: { sortBy: string; order: 'asc' | 'desc' }, userId?: number): Promise<PaginatedResult<Bull>> {
        const { page, limit } = pagination;
        const skip = (page - 1) * limit;

        const where: Prisma.BullWhereInput = this.buildWhereClause(filters);

        // Default sort by id asc if no sort provided
        const orderBy: Prisma.BullOrderByWithRelationInput = sort
            ? { [sort.sortBy]: sort.order }
            : { id: 'asc' };

        // If userId is provided, include favorites relation filtered by userId
        const include = userId ? {
            favorites: {
                where: { userId },
                select: { userId: true } // Only need to see if it exists
            }
        } : undefined;

        const [total, data] = await Promise.all([
            this.prisma.bull.count({ where }),
            this.prisma.bull.findMany({
                where,
                skip,
                take: limit,
                orderBy,
                include,
            }),
        ]);

        const lastPage = Math.ceil(total / limit);

        const mappedData = data.map((item: any) => {
            const isFavorite = userId && item.favorites?.length > 0;
            const domainBull = BullMapper.toDomain(item);
            // Re-instantiate with isFavorite if true, otherwise default false is fine
            if (isFavorite) {
                return new Bull(
                    domainBull.id,
                    domainBull.caravana,
                    domainBull.nombre,
                    domainBull.uso,
                    domainBull.origen,
                    domainBull.pelaje,
                    domainBull.raza,
                    domainBull.edad_meses,
                    domainBull.stats,
                    domainBull.caracteristica_destacada,
                    domainBull.bullScore,
                    true
                );
            }
            return domainBull;
        });

        return {
            data: mappedData,
            total,
            page,
            lastPage,
        };
    }

    async findById(id: number): Promise<Bull | null> {
        const bull = await this.prisma.bull.findUnique({ where: { id } });
        if (!bull) return null;
        return BullMapper.toDomain(bull);
    }

    private buildWhereClause(filters: BullFilters): Prisma.BullWhereInput {
        const where: Prisma.BullWhereInput = {};

        if (filters.search) {
            where.OR = [
                { caravana: { contains: filters.search, mode: 'insensitive' } },
                { nombre: { contains: filters.search, mode: 'insensitive' } },
            ];
        }

        if (filters.origen) {
            where.origen = filters.origen;
        }

        if (filters.uso) {
            where.uso = filters.uso;
        }

        if (filters.pelaje) {
            where.pelaje = filters.pelaje;
        }

        // Ages can be added later if needed

        return where;
    }
}
