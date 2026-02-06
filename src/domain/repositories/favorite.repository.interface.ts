import { Bull } from '../entities/bull.entity';

export interface IFavoriteRepository {
    add(userId: number, bullId: number): Promise<void>;
    remove(userId: number, bullId: number): Promise<void>;
    findByUserId(userId: number): Promise<Bull[]>;
}
