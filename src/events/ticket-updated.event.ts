import { Subjects } from "./subjects";

export interface ITicketUpdatedEvent {
  subject: Subjects.TICKET_UPDATED;
  data: { id: string; title: string; userId: string; price: number };
}
