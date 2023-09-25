import { Router } from "express";
import { ProductController } from "../controllers/products.controller.js";
import { catchAsync } from "../utils/utils.js";

export const productsRouter = Router();
productsRouter
  .route("/")
  .get(catchAsync(ProductController.getAllProducts))
  .post(catchAsync(ProductController.createProduct))
  .delete(catchAsync(ProductController.deleteAllProducts));
productsRouter
  .route("/:id")
  .get(catchAsync(ProductController.getProductById))
  .patch(catchAsync(ProductController.updateProduct))
  .delete(catchAsync(ProductController.deleteProduct));
