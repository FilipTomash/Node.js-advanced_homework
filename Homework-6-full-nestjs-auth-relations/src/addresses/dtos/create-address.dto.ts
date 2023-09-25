import { IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  street: string;
  @IsNumber()
  streetNumber: number;
  @IsString()
  city: string;

  @IsString()
  user: string;
}
