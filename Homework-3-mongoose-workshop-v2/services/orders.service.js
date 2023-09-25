import { Order } from "../models/orders.model.js";
import { User } from "../models/users.model.js";
import { CustomError } from "../utils/customError.js";
export class OrderService {
  static async getAllOrders() {
    const orders = await Order.find({});
    return orders;
  }
  static async getOrderById(orderId) {
    const foundOrder = await Order.findById(orderId).populate("products");
    if (!foundOrder) throw new CustomError(400, "No such order!!!");
    return foundOrder;
  }
  static async createOrder(data) {
    if (data._id) throw new CustomError(400, "Invalid input");
    const newOrder = new Order(data);
    // const toUser = await User.findById(id);
    // console.log("User", toUser);
    // console.log("Order", newOrder);
    // newOrder.user.push(toUser);
    const createdOrder = await newOrder.save();
    return createdOrder;
  }
  static async updateOrder(orderId, data) {
    if (data._id) throw new CustomError(400, "Invalid input");
    if (data.products) throw new CustomError(400, "Invalid input"); //cahnging the product inside the order is a nasty thing on this case
    const foundOrder = await this.getOrderById(orderId);
    Object.assign(foundOrder, data);
    const updatedOrder = await foundOrder.save();
    return updatedOrder;
  }
  static async deleteOrder(orderId) {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) throw new CustomError(400, "No such order!!!");
  }
}
