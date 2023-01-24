import { NextApiRequest, NextApiResponse } from "next";
import { getErrorMessage } from "../../helpers/getErrorMessage";
import { Task } from "../../types";
import clientPromise from "../../util/mongodb";

export type TasksApiResponse = {
  tasks: Task[];
  nextId: number;
};

const tasks = async (
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
  } catch (err) {
    res
      .status(500)
      .send({ name: "tasks error", message: getErrorMessage(err) });
  }
};

export default tasks;
