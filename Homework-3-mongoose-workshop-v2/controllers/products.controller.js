import { ProductService } from "../services/products.service.js";

export class ProductController {
  static async getAllProducts(req, res) {
    const filters = req.query;
    const products = await ProductService.getAllProducts(filters);
    res.status(200).json(products);
  }
  static async getProductById(req, res) {
    const id = req.params.id;
    const foundProduct = await ProductService.getProductById(id);
    res.status(200).json(foundProduct);
  }
  static async createProduct(req, res) {
    const data = req.body;
    const createdProduct = await ProductService.createProduct(data);
    res.status(201).json(createdProduct);
  }
  static async updateProduct(req, res) {
    const id = req.params.id;
    const data = req.body;
    const updatedProduct = await ProductService.updateProduct(id, data);
    res.status(201).json(updatedProduct);
  }
  static async deleteProduct(req, res) {
    const id = req.params.id;
    await ProductService.deleteProduct(id);
    res.sendStatus(204);
  }
  static async deleteAllProducts(req, res) {
    await ProductService.deleteAllProducts();
    res.sendStatus(204);
  }
}
