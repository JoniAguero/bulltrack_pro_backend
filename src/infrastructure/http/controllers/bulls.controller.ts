import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetBullsUseCase } from '../../../application/use-cases/get-bulls.use-case';
import { BullOrigin, BullUse, BullCoat } from '../../../domain/entities/bull.entity';

@Controller('bulls')
@UseGuards(AuthGuard('jwt'))
export class BullsController {
    constructor(private readonly getBullsUseCase: GetBullsUseCase) { }

    @Get()
    async findAll(
        @Query('page') page: string = '1',
        @Query('limit') limit: string = '10',
        @Query('search') search?: string,
        @Query('origen') origen?: string,
        @Query('uso') uso?: string,
        @Query('pelaje') pelaje?: string,
        @Query('sortBy') sortBy?: string,
        @Query('order') order: string = 'asc',
        @Request() req?: any,
    ) {
        const pageNum = parseInt(page, 10) || 1;
        const limitNum = parseInt(limit, 10) || 10;
        const sortOrder = order === 'desc' ? 'desc' : 'asc';

        const userId = req?.user?.userId ? Number(req.user.userId) : undefined;

        return this.getBullsUseCase.execute(
            { search, origen: origen as BullOrigin, uso: uso as BullUse, pelaje: pelaje as BullCoat },
            { page: pageNum, limit: limitNum },
            sortBy ? { sortBy, order: sortOrder } : undefined,
            userId
        );
    }
}
