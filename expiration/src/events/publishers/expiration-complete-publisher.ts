import { Stan } from 'node-nats-streaming';
import { Subjects, Publisher, ExpirationCompleteEvent } from '@vrtickets1/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;

  constructor(client: Stan) {
    super(client);
  }
}