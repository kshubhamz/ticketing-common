import { Subjects } from "./subjects";

export interface ITicketCreatedEvent {
  subject: Subjects.TICKET_CREATED;
  data: { id: string; title: string; userId: string; price: number };
}
