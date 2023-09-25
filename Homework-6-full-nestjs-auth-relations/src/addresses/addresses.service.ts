import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/create-address.dto';

@Injectable()
export class AddressesService {
  @InjectRepository(Address) private addressRepo: Repository<Address>;
  findAllAddresses() {
    return this.addressRepo.find();
  }
  async findAddressById(id: number) {
    const foundAddress = await this.addressRepo.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!foundAddress) throw new NotFoundException('Address not found');
    return foundAddress;
  }
  async createAddress(addressData: CreateAddressDto) {
    const newAddress = this.addressRepo.create({
      ...addressData,
      user: { id: addressData.user || null },
    });
    await this.addressRepo.save(newAddress);
    return newAddress;
  }
}
