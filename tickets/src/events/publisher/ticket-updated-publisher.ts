import { Publisher, Subjects, TicketUpdatedEvent } from '@vrtickets1/common';
import { Stan } from 'node-nats-streaming';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;

  constructor(client: Stan) {
    super(client);
  }
}