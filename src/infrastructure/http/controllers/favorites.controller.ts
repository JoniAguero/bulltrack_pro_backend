import { Controller, Post, Delete, Get, Param, UseGuards, Request, ParseIntPipe, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddFavoriteUseCase } from '../../../application/use-cases/add-favorite.use-case';
import { RemoveFavoriteUseCase } from '../../../application/use-cases/remove-favorite.use-case';
import { GetUserFavoritesUseCase } from '../../../application/use-cases/get-user-favorites.use-case';

@Controller('favorites')
@UseGuards(AuthGuard('jwt'))
export class FavoritesController {
    private readonly logger = new Logger(FavoritesController.name);

    constructor(
        private readonly addFavoriteUseCase: AddFavoriteUseCase,
        private readonly removeFavoriteUseCase: RemoveFavoriteUseCase,
        private readonly getUserFavoritesUseCase: GetUserFavoritesUseCase,
    ) { }

    @Post(':id')
    @HttpCode(HttpStatus.CREATED)
    async add(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
        const userId = req.user.userId;
        this.logger.log(`Adding bull ${id} to favorites for user ${userId}`);
        return this.addFavoriteUseCase.execute(userId, id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
        const userId = req.user.userId;
        this.logger.log(`Removing bull ${id} from favorites for user ${userId}`);
        return this.removeFavoriteUseCase.execute(userId, id);
    }

    @Get()
    async findAll(@Request() req: any) {
        const userId = req.user.userId;
        this.logger.log(`Fetching all favorites for user ${userId}`);
        return this.getUserFavoritesUseCase.execute(userId);
    }
}
