import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductsService {
  @InjectRepository(Product) private productRepo: Repository<Product>;
  getAllProducts() {
    return this.productRepo.find();
  }
  async getProductById(id: number) {
    const foundProduct = await this.productRepo.findOne({
      where: { id },
      relations: { orders: true },
    });
    if (!foundProduct) throw new NotFoundException('Product not found');
    return foundProduct;
  }
  async createProduct(productData: CreateProductDto) {
    const newProduct = this.productRepo.create(productData);
    await this.productRepo.save(newProduct);
    return newProduct;
  }
  async updateProduct(id: number, updateData: UpdateProductDto) {
    const foundProduct = await this.getProductById(id);
    Object.assign(foundProduct, updateData);
    await this.productRepo.save(foundProduct);
    return foundProduct;
  }
  async deleteProduct(id: number) {
    const foundProduct = await this.getProductById(id);
    await this.productRepo.remove(foundProduct);
  }
}
