import { Subjects } from "./subjects";
import { OrderStatus } from "./type/order-status";

export interface OrderCreatedEvent {
  subject: Subjects.ORDER_CREATED;
  data: {
    id: string;
    userId: string;
    expiresAt: string;
    status: OrderStatus;
    ticket: { id: string; price: number };
  };
}
