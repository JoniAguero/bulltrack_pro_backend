import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IFavoriteRepository } from '../../../../domain/repositories/favorite.repository.interface';
import { Bull } from '../../../../domain/entities/bull.entity';
import { BullMapper } from '../mappers/bull.mapper';

@Injectable()
export class PrismaFavoriteRepository implements IFavoriteRepository {
    constructor(private readonly prisma: PrismaService) { }

    async add(userId: number, bullId: number): Promise<void> {
        await this.prisma.favorite.create({
            data: {
                userId,
                bullId,
            },
        }).catch((error: any) => {
            // Ignore if already exists (P2002)
            if (error.code !== 'P2002') throw error;
        });
    }

    async remove(userId: number, bullId: number): Promise<void> {
        await this.prisma.favorite.deleteMany({
            where: {
                userId,
                bullId,
            },
        });
    }

    async findByUserId(userId: number): Promise<Bull[]> {
        const favorites = await this.prisma.favorite.findMany({
            where: { userId },
            include: { bull: true },
        });

        return favorites.map((fav: any) => {
            const domainBull = BullMapper.toDomain(fav.bull);
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
                true // isFavorite
            );
        });
    }
}
