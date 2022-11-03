import { Frequency } from "../constants";

export class Room {
  id: number;
  name: string;

  constructor(props?: Room) {
    this.id = props?.id ?? -1;
    this.name = props?.name ?? "";
  }
}

export class Task {
  id: number;
  frequencyAmount: number;
  frequencyType: Frequency;
  lastDone: Date;
  name: string;
  roomId: number;

  constructor(props?: Task) {
    this.id = props?.id ?? -1;
    this.frequencyAmount = props?.frequencyAmount ?? 0;
    this.frequencyType = props?.frequencyType ?? Frequency.WEEKS;
    this.lastDone = props?.lastDone ? new Date(props.lastDone) : new Date();
    this.name = props?.name ?? "";
    this.roomId = props?.roomId ?? -1;
  }
}

export type TaskWithDaysUntilDue = Task & {
  /**
   * A positive value means the task is due soon, while a negative value means it's overdue.
   */
  daysUntilDue: number;
};
