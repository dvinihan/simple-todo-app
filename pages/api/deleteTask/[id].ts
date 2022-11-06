import { NextApiRequest, NextApiResponse } from "next";
import { getParamValue } from "../../../helpers/url";
import { Task } from "../../../types";
import clientPromise from "../../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;

    const taskIdString = getParamValue(req.query["taskId"]);
    const taskId =
      taskIdString === undefined ? undefined : Number(taskIdString);

    const data = await client
      .db("simple-cleaning-app")
      .collection<Task>("tasks")
      .deleteOne({ id: taskId });
    res.send(data);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};
