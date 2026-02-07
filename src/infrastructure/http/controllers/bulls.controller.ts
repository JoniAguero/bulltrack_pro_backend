import { Controller, Get, Query, UseGuards, Request, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetBullsUseCase } from '../../../application/use-cases/get-bulls.use-case';
import { BullOrigin, BullUse, BullCoat } from '../../../domain/entities/bull.entity';

@Controller('bulls')
@UseGuards(AuthGuard('jwt'))
export class BullsController {
    private readonly logger = new Logger(BullsController.name);

    constructor(private readonly getBullsUseCase: GetBullsUseCase) { }

    @Get()
    async findAll(
        @Query() query: any,
        @Request() req?: any,
    ) {
        this.logger.log(`Incoming request to BullsController.findAll - Query: ${JSON.stringify(query)}`);

        const {
            page = '1',
            limit = '10',
            search,
            origen,
            uso,
            pelaje,
            favorites, // Added favorites here to ensure it's destructured
            sortBy,
            order = 'asc'
        } = query;
        const pageNum = parseInt(page, 10) || 1;
        const limitNum = parseInt(limit, 10) || 10;
        const sortOrder = order === 'desc' ? 'desc' : 'asc';

        const userId = req?.user?.userId ? Number(req.user.userId) : undefined;

        return this.getBullsUseCase.execute(
            { search, origen: origen as BullOrigin, uso: uso as BullUse, pelaje: pelaje as BullCoat, favorites: favorites === 'true' },
            { page: pageNum, limit: limitNum },
            sortBy ? { sortBy, order: sortOrder } : undefined,
            userId
        );
    }
}
