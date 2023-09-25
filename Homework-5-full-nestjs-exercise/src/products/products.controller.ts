import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { title } from 'process';
import { ProductFilters } from './interfaces/products-filters.interface';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto copy';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  findAllProducts(
    @Query() filters: ProductFilters,
    // @Query('title') title: string,
    // @Query('inStock') inStock: string,
    // @Query('orderBy') orderBy: 'stock' | 'price',
    // @Query('sortOrder') sortOrder: 'ASC' | 'DESC',
  ) {
    // const filters: ProductFilters = {
    //   title,
    //   inStock: !!inStock,
    //   orderBy,
    //   sortOrder,
    // };
    return this.productsService.findAllProducts(filters);
  }
  @Get('/:id')
  findProductById(@Param('id') productId: string) {
    return this.productsService.getProductById(Number(productId));
  }
  @Post()
  createProduct(@Body() productData: CreateProductDto) {
    return this.productsService.createProduct(productData);
  }
  @Patch('/:id')
  updateProduct(
    @Param('id') productId: string,
    @Body() updateData: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(Number(productId), updateData);
  }
  @Delete('/:id')
  removeProduct(@Param('id') productId: string) {
    return this.productsService.removeProduct(Number(productId));
  }
  @Delete()
  @HttpCode(201)
  removeAllProducts() {
    return this.productsService.removeAllProducts();
  }
}
