import { Frequency } from "../constants";

export class List {
  _id: string;
  name: string;

  constructor(props?: Partial<List>) {
    this._id = props?._id ?? "";
    this.name = props?.name ?? "";
  }
}

export class Section {
  _id: string;
  listId: string;
  name: string;

  constructor(props?: Partial<Section>) {
    this._id = props?._id ?? "";
    this.listId = props?.listId ?? "";
    this.name = props?.name ?? "";
  }
}

export class Task {
  _id: string;
  sectionId: string;
  frequencyAmount: number;
  frequencyType: Frequency;
  dueDateMS: number;
  name: string;
  isCompleted: boolean;

  constructor(props?: Partial<Task>) {
    this._id = props?._id ?? "";
    this.sectionId = props?.sectionId ?? "";
    this.frequencyAmount = props?.frequencyAmount ?? 0;
    this.frequencyType = props?.frequencyType ?? Frequency.WEEKS;
    this.dueDateMS = props?.dueDateMS ?? Date.now();
    this.name = props?.name ?? "";
    this.isCompleted = props?.isCompleted ?? false;
  }
}

export type ExtendedTask = Task & {
  /**
   * A positive value means the task is due soon, while a negative value means it's overdue.
   */
  daysUntilDue: number;
  roomName: string;
};
