import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { OrderCancelledListener } from '../order-cancelled-listener'
import { OrderCancelledEvent } from '@vrtickets1/common';
import { natsWrapper } from '../../../nats-wrapper'
import { Ticket } from '../../../models/ticket';

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const orderId = mongoose.Types.ObjectId().toHexString();
  const ticket = Ticket.build({
    title: 'concert',
    price: 99,
    userId: 'jkbaksbdjkasd',
  });
  ticket.set({ orderId });
  await ticket.save();

  // Create the fake data event 
  const data: OrderCancelledEvent['data'] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    ticket: {
        id: ticket.id
    }
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  }

  return { listener, ticket, data, msg, orderId };
};

it('updates the ticket, publishes an event, and acks the message', async () => {
  const { msg, data, ticket, orderId, listener } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);
  expect(updatedTicket!.orderId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
})