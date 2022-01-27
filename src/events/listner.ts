import { Message, Stan, SubscriptionOptions } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface IEvent {
  subject: Subjects;
  data: any;
}

export abstract class Listner<T extends IEvent> {
  abstract subject: T["subject"];
  abstract queueGroupName: string;
  protected ackWait = 5 * 1000;
  abstract onMessage(data: T["data"], message: Message): void;

  constructor(protected client: Stan) {}

  get subscriptionOptions(): SubscriptionOptions {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf-8"));
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions
    );
    subscription.on("message", (msg: Message) => {
      console.log(`Message received: ${this.queueGroupName} - ${this.subject}`);
      const paresdData = this.parseMessage(msg);
      this.onMessage(paresdData, msg);
    });
  }
}
