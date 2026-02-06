import { Controller, Post, Delete, Get, Param, UseGuards, Request, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddFavoriteUseCase } from '../../../application/use-cases/add-favorite.use-case';
import { RemoveFavoriteUseCase } from '../../../application/use-cases/remove-favorite.use-case';
import { GetUserFavoritesUseCase } from '../../../application/use-cases/get-user-favorites.use-case';

@Controller('favorites')
@UseGuards(AuthGuard('jwt'))
export class FavoritesController {
    constructor(
        private readonly addFavoriteUseCase: AddFavoriteUseCase,
        private readonly removeFavoriteUseCase: RemoveFavoriteUseCase,
        private readonly getUserFavoritesUseCase: GetUserFavoritesUseCase,
    ) { }

    @Post(':id')
    @HttpCode(HttpStatus.CREATED)
    async add(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
        return this.addFavoriteUseCase.execute(req.user.userId, id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
        return this.removeFavoriteUseCase.execute(req.user.userId, id);
    }

    @Get()
    async findAll(@Request() req: any) {
        return this.getUserFavoritesUseCase.execute(req.user.userId);
    }
}
