import { Product } from "../models/products.model.js";

export class ProductService {
  static async getAllProducts(filters) {
    // sorting filters by price, rating and stock
    let sortFilter;

    if (filters?.sortByPrice === "asc") {
      sortFilter = { price: 1 };
    }
    if (filters?.sortByPrice === "desc") {
      sortFilter = { price: -1 };
    }
    if (filters?.sortByRating === "asc") {
      sortFilter = { rating: 1 };
    }
    if (filters?.sortByRating === "desc") {
      sortFilter = { rating: -1 };
    }
    if (filters?.sortByStock === "asc") {
      sortFilter = { stock: 1 };
    }
    if (filters?.sortByStock === "desc") {
      sortFilter = { stock: -1 };
    }
    // filtering products by stock or out of stock
    if (filters?.stock === "true") filters.stock = { $gt: 0 };
    if (filters?.stock === "false") filters.stock = { $lte: 0 };
    //
    const { sortByPrice, sortByRating, sortByStock, ...updatedFilters } = filters;
    console.log(filters);
    const products = await Product.find(updatedFilters || {}).sort(sortFilter || null);
    return products;
  }
  static async getProductById(productId) {
    const foundProduct = await Product.findById(productId);
    if (!foundProduct) throw new Error("Product not found");
    return foundProduct;
  }
  static async createProduct(data) {
    if (data._id) throw new Error("Invalid input");
    const newProduct = new Product(data);
    const createdProduct = newProduct.save();
    return createdProduct;
  }
  static async updateProduct(productId, data) {
    if (data._id) throw new Error("Invalid input");
    const foundProduct = await this.getProductById(productId);
    Object.assign(foundProduct, data);
    const updatedProduct = await foundProduct.save();
    return updatedProduct;
  }
  static async deleteProduct(productId) {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) throw new Error("Product not found!!!");
  }
  static async deleteAllProducts() {
    const deletedProduct = await Product.deleteMany({});
  }
}
