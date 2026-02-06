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

        // The following lines are added based on the provided Code Edit,
        // assuming 'sort' and 'Prisma' context would be available if this were a repository or service.
        // As this is a controller, 'sort' and 'Prisma' are not defined here.
        // This might indicate the Code Edit was intended for a different file or requires additional context.
        // For now, I'm adding the log as requested, but 'orderBy' will be undefined.
        // Default sort by id asc if no sort provided
        // const orderBy: Prisma.BullOrderByWithRelationInput = sort 
        //   ? { [sort.sortBy]: sort.order } 
        //   : { id: 'asc' };

        // console.log('Repo OrderBy:', JSON.stringify(orderBy)); // This will log 'undefined' for 'orderBy'

        return this.getBullsUseCase.execute(
            { search, origen: origen as BullOrigin, uso: uso as BullUse, pelaje: pelaje as BullCoat },
            { page: pageNum, limit: limitNum },
            sortBy ? { sortBy, order: sortOrder } : undefined,
            userId
        );
    }
}
