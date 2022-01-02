import { Publisher, OrderCreatedEvent, Subjects } from '@vrtickets1/common';
import { Stan } from 'node-nats-streaming';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;

  constructor(client: Stan) {
    super(client);
  }
}