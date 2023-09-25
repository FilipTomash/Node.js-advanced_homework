import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from './manager.entity';
import { Repository } from 'typeorm';
import { CreateManagerDto } from './dtos/create-manager.dto';
import { UpdateManagerDto } from './dtos/update-manager.dto';

@Injectable()
export class ManagerService {
  @InjectRepository(Manager) private managerRepo: Repository<Manager>;
  getAllManagers() {
    return this.managerRepo.find();
  }
  async findManagerById(id: string) {
    const foundManager = await this.managerRepo.findOne({
      where: { id },
      relations: { team: true },
    });
    if (!foundManager) throw new NotFoundException('Manager not found');
    return foundManager;
  }
  async createManager(managerData: CreateManagerDto) {
    const newManager = this.managerRepo.create(managerData);
    await this.managerRepo.save(newManager);
    return newManager;
  }
  async updateManager(id: string, updateData: UpdateManagerDto) {
    const foundManager = await this.findManagerById(id);
    Object.assign(foundManager, updateData);
    const updatedManager = await this.managerRepo.save(foundManager);
    return updatedManager;
  }
  async deleteManager(id: string) {
    const foundManager = await this.findManagerById(id);
    await this.managerRepo.remove(foundManager);
  }
}
