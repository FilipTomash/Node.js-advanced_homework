import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/create-order.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}
  @Get()
  findAllOrders() {
    return this.ordersService.findAllOrders();
  }
  @Get('/:id')
  findOrderById(@Param('id') id: number) {
    return this.ordersService.findOrderById(id);
  }
  @Post()
  createOrder(@Body() orderData: CreateOrderDto) {
    return this.ordersService.createOrder(orderData);
  }
}
