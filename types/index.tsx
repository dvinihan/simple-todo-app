import { Frequency } from "../constants";

export const NULL_ROOM_ID = -1;
export const NULL_TASK_ID = -1;

export class Room {
  id: number;
  name: string;

  constructor(props?: Room) {
    this.id = props?.id ?? NULL_ROOM_ID;
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

  constructor(props?: Partial<Task>) {
    this.id = props?.id ?? NULL_TASK_ID;
    this.frequencyAmount = props?.frequencyAmount ?? 0;
    this.frequencyType = props?.frequencyType ?? Frequency.WEEKS;
    this.lastDone = props?.lastDone ? new Date(props.lastDone) : new Date();
    this.name = props?.name ?? "";
    this.roomId = props?.roomId ?? NULL_ROOM_ID;
  }
}

export type TaskWithDaysUntilDue = Task & {
  /**
   * A positive value means the task is due soon, while a negative value means it's overdue.
   */
  daysUntilDue: number;
};
