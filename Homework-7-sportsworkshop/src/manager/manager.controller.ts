import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dtos/create-manager.dto';
import { UpdateManagerDto } from './dtos/update-manager.dto';

@Controller('manager')
export class ManagerController {
    constructor(private managerService:ManagerService){}
    @Get()
    getAllManagers(){
        return this.managerService.getAllManagers()
    }
    @Get('/:id')
    findManagerById(@Param('id') id:string){
        return this.managerService.findManagerById((id))
    }
    @Post()
    createManager(@Body()managerData:CreateManagerDto){
        return this.managerService.createManager(managerData)
    }
    @Patch('/:id')
    updateManager(@Param('id') id:string,@Body()updateData:UpdateManagerDto){
        return this.managerService.updateManager(id,updateData)
    }
    @Delete('/:id')
    @HttpCode(204)
    deleteManager(@Param('id') id:string){
        return this.managerService.deleteManager(id)
    }
}
