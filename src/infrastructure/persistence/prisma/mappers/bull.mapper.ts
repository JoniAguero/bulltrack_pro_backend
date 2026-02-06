import { Bull as PrismaBull } from '@prisma/client';
import { Bull, BullCoat, BullOrigin, BullUse } from '../../../../domain/entities/bull.entity';

export class BullMapper {
    static toDomain(prismaBull: PrismaBull): Bull {
        return new Bull(
            prismaBull.id,
            prismaBull.caravana,
            prismaBull.nombre,
            prismaBull.uso as BullUse,
            prismaBull.origen as BullOrigin,
            prismaBull.pelaje as BullCoat,
            prismaBull.raza,
            prismaBull.edad_meses,
            {
                crecimiento: prismaBull.crecimiento,
                facilidad_parto: prismaBull.facilidad_parto,
                reproduccion: prismaBull.reproduccion,
                moderacion: prismaBull.moderacion,
                carcasa: prismaBull.carcasa,
            },
            prismaBull.caracteristica_destacada,
            // We will map bullScore if it exists on the prisma object (e.g. from raw query) or default to logic later.
            // For now, assuming it's not persisted in this step.
            undefined,
            undefined // isFavorite placeholder
        );
    }
}
