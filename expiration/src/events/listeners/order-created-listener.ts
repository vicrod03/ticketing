import { Stan, Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@vrtickets1/common';
import { queueGroupName } from './queue-group-name';
import { expirationQueue } from '../../queues/expiration-queue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;

  constructor(client: Stan) {
    super(client);
  }

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log('Waiting this many milliseconds to process the job: ', delay);

    await expirationQueue.add({
      orderId: data.id
    }, {
      delay
    });

    msg.ack();
  }
}