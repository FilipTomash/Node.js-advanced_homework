import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dtos/create-team.dto';
import { UpdateTeamDto } from './dtos/update-team.dto';

@Controller('team')
export class TeamController {
    constructor(private teamService:TeamService){}
    @Get()
    getAllTeams(){
        return this.teamService.getAllTeams()
    }
    @Get('/:id')
    findManagerById(@Param('id') id:string){
        return this.teamService.findTeamById((id))
    }
    @Post()
    createTeam(@Body()teamData:CreateTeamDto){
        return this.teamService.createTeam(teamData)
    }
    @Patch('/:id')
    updateTeam(@Param('id') id:string,@Body()updateData:UpdateTeamDto){
        return this.teamService.updateTeam(id,updateData)
    }
    @Delete('/:id')
    @HttpCode(204)
    deleteTeam(@Param('id') id:string){
        return this.teamService.deleteTeam(id)
    }
}
