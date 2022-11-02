import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;

    const data = await client
      .db("simple-cleaning-app")
      .collection("tasks")
      .find()
      .toArray();
    const highestId = data.reduce(
      (max, task) => (task.id > max ? task.id : max),
      -1
    );
    res.send({ tasks: data, nextId: highestId + 1 });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
