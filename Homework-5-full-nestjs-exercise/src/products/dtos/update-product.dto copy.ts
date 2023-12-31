import { IsString, IsNumber, Length, Min, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @Length(3, 30)
  title: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price: number;
}
