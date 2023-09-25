import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Controller('players')
export class PlayersController {
    constructor(private playerService:PlayersService){}
    @Get()
    getAllPlayers(){
        return this.playerService.getAllPlayers()
    }
    @Get('/:id')
    findManagerById(@Param('id') id:string){
        return this.playerService.findPlayerById((id))
    }
    @Post()
    createPlayer(@Body()playerData:CreatePlayerDto){
        return this.playerService.createPlayer(playerData)
    }
    @Patch('/:id')
    updatePlayer(@Param('id') id:string,@Body()updateData:UpdatePlayerDto){
        return this.playerService.updatePlayer(id,updateData)
    }
    @Delete('/:id')
    @HttpCode(204)
    deleteManager(@Param('id') id:string){
        return this.playerService.deletePlayer(id)
    }
}
