import { NextApiRequest, NextApiResponse } from "next";
import { getNumberUrlParam } from "../../../helpers/url";
import clientPromise from "../../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;

    const roomId = getNumberUrlParam(
      new URL(req.url ?? "", `http://${req.headers.host}`),
      "roomId"
    );

    await client
      .db("simple-cleaning-app")
      .collection("tasks")
      .deleteMany({ roomId });

    const data = await client
      .db("simple-cleaning-app")
      .collection("rooms")
      .deleteOne({ id: roomId });
    res.send(data);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};
