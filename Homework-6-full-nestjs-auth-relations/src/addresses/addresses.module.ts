import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './address.entity';
import { AddressesController } from './addresses.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  providers: [AddressesService],
  controllers: [AddressesController],
})
export class AddressesModule {}
