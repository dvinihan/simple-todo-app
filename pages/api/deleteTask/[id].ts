import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;

    const { id } = req.query;

    const stringId = typeof id === "string" ? id : id[0];
    const data = await client
      .db("simple-cleaning-app")
      .collection("tasks")
      .deleteOne({ id: Number.parseInt(stringId) });
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
