export type BullUse = 'vaquillona' | 'vaca';
export type BullOrigin = 'propio' | 'catalogo';
export type BullCoat = 'negro' | 'colorado';

export interface BullStats {
    crecimiento: number;
    facilidad_parto: number;
    reproduccion: number;
    moderacion: number;
    carcasa: number;
}

export class Bull {
    constructor(
        public readonly id: number,
        public readonly caravana: string,
        public readonly nombre: string,
        public readonly uso: BullUse,
        public readonly origen: BullOrigin,
        public readonly pelaje: BullCoat,
        public readonly raza: string,
        public readonly edad_meses: number,
        public readonly stats: BullStats,
        public readonly caracteristica_destacada: string | null,
        public readonly bullScore?: number,
        public readonly isFavorite: boolean = false,
    ) {
        if (!bullScore) {
            this.bullScore = this.calculateScore();
        }
    }


    // Se calcula el score del toro en la entidad para tenerlo actualizado siempre si llega a cambiar la fórmula
    calculateScore(): number {
        const { crecimiento, facilidad_parto, reproduccion, moderacion, carcasa } = this.stats;

        const score =
            (crecimiento * 0.30) +
            (facilidad_parto * 0.25) +
            (reproduccion * 0.20) +
            (moderacion * 0.15) +
            (carcasa * 0.10);

        return Math.round(score * 100) / 100;
    }
}
