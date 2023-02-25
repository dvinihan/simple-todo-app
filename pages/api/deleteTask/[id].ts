import { NextApiRequest, NextApiResponse } from "next";
import { getErrorMessage } from "../../../helpers/getErrorMessage";
import { getParamValue } from "../../../helpers/getParamValue";
import { Task } from "../../../types";
import clientPromise from "../../../util/mongodb";

const deleteTask = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;

    const taskIdString = getParamValue(req.query["id"]);
    const taskId =
      taskIdString === undefined ? undefined : Number(taskIdString);

    const data = await client
      .db("simple-todo-app")
      .collection<Task>("tasks")
      .deleteOne({ id: taskId });
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: getErrorMessage(err) });
  }
};

export default deleteTask;
