import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { Repository, FindManyOptions, MoreThan, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductFilters } from './interfaces/products-filters.interface';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto copy';
@Injectable()
export class ProductsService {
  @InjectRepository(Product) private productsRepo: Repository<Product>;
  findAllProducts(filters: ProductFilters) {
    const filterConfig: FindManyOptions<Product> = {};
    if (filters.title)
      filterConfig.where = {
        ...filterConfig.where,
        title: ILike(`%${filters.title}%`),
      };
    if (filters.inStock)
      filterConfig.where = { ...filterConfig.where, stock: MoreThan(0) };
    //   TODO - make new filters where searching is for Equal value, LessThan etc - but get the number dynamically
    if (filters.orderBy) {
      const sortOrder = filters.sortOrder || 'ASC';
      if (filters.orderBy === 'stock')
        filterConfig.order = { stock: sortOrder };
      if (filters.orderBy === 'price')
        filterConfig.order = { price: sortOrder };
    }
    return this.productsRepo.find(filterConfig);
  }
  async getProductById(id: number) {
    const product = await this.productsRepo.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
  async createProduct(productData: CreateProductDto) {
    const product = this.productsRepo.create(productData);
    await this.productsRepo.save(product);
    return product;
  }
  async updateProduct(id: number, updateData: UpdateProductDto) {
    const foundProduct = await this.getProductById(id);
    Object.assign(foundProduct, updateData);
    await this.productsRepo.save(foundProduct);
  }
  async removeProduct(id: number) {
    const foundProduct = await this.getProductById(id);
    await this.productsRepo.remove(foundProduct);
  }
  async removeAllProducts() {
    await this.productsRepo.clear();
  }
}
