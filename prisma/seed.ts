import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const BULLS_DATA = [
    {
        id: 1,
        caravana: "992",
        nombre: "Toro Black Emerald",
        uso: "vaquillona",
        origen: "propio",
        pelaje: "negro",
        raza: "Angus",
        edad_meses: 36,
        caracteristica_destacada: "Top 1% calving ease",
        stats: {
            crecimiento: 85,
            facilidad_parto: 98,
            reproduccion: 75,
            moderacion: 60,
            carcasa: 82
        },
        bullScore: 0
    },
    {
        id: 2,
        caravana: "845",
        nombre: "Red Diamond",
        uso: "vaca",
        origen: "catalogo",
        pelaje: "colorado",
        raza: "Angus",
        edad_meses: 42,
        caracteristica_destacada: "Top 5% carcass",
        stats: {
            crecimiento: 90,
            facilidad_parto: 40,
            reproduccion: 88,
            moderacion: 70,
            carcasa: 95
        },
        bullScore: 0
    },
    {
        id: 3,
        caravana: "102",
        nombre: "General 102",
        uso: "vaquillona",
        origen: "catalogo",
        pelaje: "negro",
        raza: "Brangus",
        edad_meses: 30,
        caracteristica_destacada: null,
        stats: {
            crecimiento: 70,
            facilidad_parto: 92,
            reproduccion: 65,
            moderacion: 80,
            carcasa: 60
        },
        bullScore: 0
    },
    {
        id: 4,
        caravana: "554",
        nombre: "Indomable",
        uso: "vaca",
        origen: "propio",
        pelaje: "colorado",
        raza: "Hereford",
        edad_meses: 48,
        caracteristica_destacada: null,
        stats: {
            crecimiento: 60,
            facilidad_parto: 30,
            reproduccion: 95,
            moderacion: 50,
            carcasa: 75
        },
        bullScore: 0
    },
    {
        id: 5,
        caravana: "210",
        nombre: "Midnight Express",
        uso: "vaquillona",
        origen: "propio",
        pelaje: "negro",
        raza: "Angus",
        edad_meses: 28,
        caracteristica_destacada: "Efficiency Leader",
        stats: {
            crecimiento: 78,
            facilidad_parto: 95,
            reproduccion: 82,
            moderacion: 85,
            carcasa: 68
        },
        bullScore: 0
    },
    {
        id: 6,
        caravana: "773",
        nombre: "Rustic King",
        uso: "vaca",
        origen: "catalogo",
        pelaje: "colorado",
        raza: "Braford",
        edad_meses: 54,
        caracteristica_destacada: "Heat Tolerant",
        stats: {
            crecimiento: 92,
            facilidad_parto: 35,
            reproduccion: 90,
            moderacion: 45,
            carcasa: 88
        },
        bullScore: 0
    },
    {
        id: 7,
        caravana: "304",
        nombre: "Shadow Warrior",
        uso: "vaquillona",
        origen: "propio",
        pelaje: "negro",
        raza: "Brangus",
        edad_meses: 32,
        caracteristica_destacada: "Performance Pro",
        stats: {
            crecimiento: 88,
            facilidad_parto: 85,
            reproduccion: 70,
            moderacion: 65,
            carcasa: 91
        },
        bullScore: 0
    }
];

async function main() {
    console.log('Seeding database...');

    const password = await bcrypt.hash('seed28', 10);
    const user = await prisma.user.upsert({
        where: { email: 'admin@seed28.com' },
        update: {},
        create: {
            email: 'admin@seed28.com',
            name: 'Admin User',
            password,
        },
    });
    console.log({ user });

    for (const b of BULLS_DATA) {
        const { crecimiento, facilidad_parto, reproduccion, moderacion, carcasa } = b.stats;
        const score =
            (crecimiento * 0.30) +
            (facilidad_parto * 0.25) +
            (reproduccion * 0.20) +
            (moderacion * 0.15) +
            (carcasa * 0.10);

        const finalScore = Math.round(score * 100) / 100;

        const bull = await prisma.bull.upsert({
            where: { caravana: b.caravana },
            update: {
                bull_score: finalScore
            },
            create: {
                caravana: b.caravana,
                nombre: b.nombre,
                uso: b.uso,
                origen: b.origen,
                pelaje: b.pelaje,
                raza: b.raza,
                edad_meses: b.edad_meses,
                caracteristica_destacada: b.caracteristica_destacada,
                crecimiento: b.stats.crecimiento,
                facilidad_parto: b.stats.facilidad_parto,
                reproduccion: b.stats.reproduccion,
                moderacion: b.stats.moderacion,
                carcasa: b.stats.carcasa,
                bull_score: finalScore
            },
        });
        console.log(`Created/Updated bull with id: ${bull.id} and score: ${finalScore}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
