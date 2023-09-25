import { Router } from "express";
import { productsRouter } from "../routes/products.routes.js";
import { orderRouter } from "../routes/orders.routes.js";
import { userRouter } from "../routes/users.routes.js";
import { validationToken } from "../middlewares/middlewares.js";

export const globalRouter = Router();
globalRouter.use("/products", productsRouter);
globalRouter.use("/orders", validationToken, orderRouter);
globalRouter.use("/users", userRouter);
