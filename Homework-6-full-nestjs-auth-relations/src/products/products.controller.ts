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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }
  @Get('/:id')
  getProductByID(@Param('id') id: number) {
    return this.productsService.getProductById(Number(id));
  }
  @Post()
  createProduct(@Body() productData: CreateProductDto) {
    return this.productsService.createProduct(productData);
  }
  @Patch('/:id')
  updateProduct(@Param('id') id: number, @Body() updateData: UpdateProductDto) {
    return this.productsService.updateProduct(Number(id), updateData);
  }
  @Delete('/:id')
  @HttpCode(204)
  deleteProduct(@Param('id') id: number) {
    return this.productsService.deleteProduct(id);
  }
}
