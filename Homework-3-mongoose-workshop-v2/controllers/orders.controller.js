import { OrderService } from "../services/orders.service.js";
// import { UserService } from "../services/users.service.js";
export class OrderController {
  static async getAllOrders(req, res) {
    const orders = await OrderService.getAllOrders();
    res.status(200).json(orders);
  }
  static async getOrderById(req, res) {
    const id = req.params.id;
    const foundOrder = await OrderService.getOrderById(id);
    res.status(200).json(foundOrder);
  }
  static async createOrder(req, res) {
    const data = req.body;
    // const id = req.params.id;
    // const theUser = await UserService.getUserById(id);
    // console.log("From controller", theUser);
    const createdOrder = await OrderService.createOrder(data);
    res.status(201).json(createdOrder);
  }
  static async updatedOrder(req, res) {
    const id = req.params.id;
    const data = req.body;
    const updatedOrder = await OrderService.updateOrder(id, data);
    res.status(201).json(updatedOrder);
  }
  static async deleteOrder(req, res) {
    const id = req.params.id;
    await OrderService.deleteOrder(id);
    res.sendStatus(204);
  }
}
