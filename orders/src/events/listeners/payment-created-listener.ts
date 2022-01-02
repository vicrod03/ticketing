import { Subjects, Listener, PaymentCreatedEvent, OrderStatus } from '@vrtickets1/common';
import { Message, Stan } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName: string = queueGroupName;

  constructor(client: Stan) {
    super(client);
  }

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);

    if(!order) {
      throw new Error('Order not found');
    }

    order.set({
      status: OrderStatus.Complete
    });
    await order.save();

    msg.ack();
  }
}