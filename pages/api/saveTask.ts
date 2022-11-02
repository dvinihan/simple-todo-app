import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;

    const { id } = req.body;
    const data = await client
      .db("simple-cleaning-app")
      .collection("tasks")
      .updateOne({ id }, { $set: req.body }, { upsert: true });
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
