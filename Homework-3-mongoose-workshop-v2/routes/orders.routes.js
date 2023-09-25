import { Router } from "express";
import { OrderController } from "../controllers/orders.controller.js";
import { catchAsync } from "../utils/utils.js";

export const orderRouter = Router();
orderRouter.route("/").get(catchAsync(OrderController.getAllOrders)).post(catchAsync(OrderController.createOrder));
orderRouter
  .route("/:id")
  .get(catchAsync(OrderController.getOrderById))
  .patch(catchAsync(OrderController.updatedOrder))
  .delete(catchAsync(OrderController.deleteOrder));
