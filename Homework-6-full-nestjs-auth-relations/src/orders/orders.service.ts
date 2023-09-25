import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class OrdersService {
  @InjectRepository(Order) orderRepo: Repository<Order>;
  findAllOrders() {
    return this.orderRepo.find();
  }
  async findOrderById(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: { user: true },
    });
    // console.log(order);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async createOrder(orderData: CreateOrderDto) {
    const newOrder = this.orderRepo.create({
      amount: orderData.amount,
      user: { id: orderData.userId },
      products: orderData.productIds.map((productId) => {
        return { id: productId };
      }),
    });
    await this.orderRepo.save(newOrder);
    return newOrder;
  }
}
