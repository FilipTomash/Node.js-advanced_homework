import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dtos/create-address.dto';

@Controller('addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {}
  @Get()
  findAllAddresses() {
    return this.addressesService.findAllAddresses();
  }
  @Get('/:id')
  findAddressById(@Param('id') id: number) {
    return this.addressesService.findAddressById(id);
  }
  @Post()
  createAddress(@Body() addressData: CreateAddressDto) {
    return this.addressesService.createAddress(addressData);
  }
}
