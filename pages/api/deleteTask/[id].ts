import { NextApiRequest, NextApiResponse } from "next";
import { getNumberUrlParam } from "../../../helpers/url";
import clientPromise from "../../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;

    const taskId = getNumberUrlParam(req.query, "taskId");

    const data = await client
      .db("simple-cleaning-app")
      .collection("tasks")
      .deleteOne({ id: taskId });
    res.send(data);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};
