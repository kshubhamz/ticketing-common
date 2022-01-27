import { Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface IEvent {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends IEvent> {
  abstract subject: T["subject"];
  constructor(protected client: Stan) {}

  publish(data: T["data"]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          reject(err);
          return;
        }
        console.log(`Event published to ${this.subject}`);
        resolve();
      });
    });
  }
}
