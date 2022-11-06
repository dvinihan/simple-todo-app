import { WithId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Task } from "../../types";
import clientPromise from "../../util/mongodb";

export type TasksApiResponse = {
  tasks: WithId<Task>[];
  nextId: number;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<TasksApiResponse | Error>
) => {
  try {
    const client = await clientPromise;

    const data = await client
      .db("simple-cleaning-app")
      .collection<Task>("tasks")
      .find()
      .toArray();
    const highestId = data.reduce(
      (max, task) => (task.id > max ? task.id : max),
      -1
    );
    res.send({ tasks: data, nextId: highestId + 1 });
  } catch (err: any) {
    res.status(500).send({ name: "tasks error", message: err.message });
  }
};
