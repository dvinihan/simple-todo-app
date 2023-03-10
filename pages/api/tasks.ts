import { NextApiRequest, NextApiResponse } from "next";
import { getErrorMessage } from "../../helpers/getErrorMessage";
import { Task } from "../../types";
import clientPromise from "../../util/mongodb";

const tasks = async (
  req: NextApiRequest,
  res: NextApiResponse<Task[] | Error>
) => {
  try {
    const client = await clientPromise;

    const data = await client
      .db("simple-todo-app")
      .collection<Task>("tasks")
      .find()
      .toArray();

    res.send(data);
  } catch (err) {
    res
      .status(500)
      .send({ name: "tasks error", message: getErrorMessage(err) });
  }
};

export default tasks;
