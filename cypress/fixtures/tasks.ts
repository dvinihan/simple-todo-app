import { Frequency } from "../../constants";

export const mockTasksResponse = {
  tasks: [
    {
      id: 0,
      frequencyAmount: 7,
      frequencyType: Frequency.DAYS,
      lastDone: new Date("1/1/22"),
      name: "Do dishes",
      roomId: 0,
    },
    {
      id: 1,
      frequencyAmount: 7,
      frequencyType: Frequency.MONTHS,
      lastDone: new Date("4/18/22"),
      name: "Take out trash",
      roomId: 0,
    },
    {
      id: 2,
      frequencyAmount: 2,
      frequencyType: Frequency.WEEKS,
      lastDone: new Date("11/1/22"),
      name: "Laundry",
      roomId: 1,
    },
    {
      id: 3,
      frequencyAmount: 2,
      frequencyType: Frequency.WEEKS,
      lastDone: new Date("11/4/22"),
      name: "clean baby",
      roomId: 1,
    },
  ],
};
