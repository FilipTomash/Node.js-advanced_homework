import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dtos/create-match.dto';
import { UpdateMatchDto } from './dtos/update-match.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('matches')
export class MatchesController {
  constructor(private matchesService: MatchesService) {}
  @Get()
  getAllMatches() {
    return this.matchesService.getAllMatches();
  }
  @Get('/:id')
  findMatchById(@Param('id') id: number) {
    return this.matchesService.findMatchById(id);
  }
  @Post()
  createMatch(@Body() matchData: CreateMatchDto) {
    return this.matchesService.createMatch(matchData);
  }
  @Patch('/:id')
  updateMatch(@Param('id') id: number, @Body() updateData: UpdateMatchDto) {
    return this.matchesService.updateMatch(id, updateData);
  }
  @Delete('/:id')
  @HttpCode(204)
  deleteMatch(@Param('id') id: number) {
    return this.matchesService.deleteMatch(id);
  }
}
