import { Subjects, Publisher, PaymentCreatedEvent } from '@vrtickets1/common';
import { Stan } from 'node-nats-streaming';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;

  constructor(client: Stan) {
    super(client);
  }
}