import { NextApiRequest, NextApiResponse } from "next";
import { getParamValue } from "../../../helpers/url";
import { Room, Task } from "../../../types";
import clientPromise from "../../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;

    const roomIdString = getParamValue(req.query["roomId"]);
    const roomId =
      roomIdString === undefined ? undefined : Number(roomIdString);

    await client
      .db("simple-cleaning-app")
      .collection<Task>("tasks")
      .deleteMany({ roomId });

    const data = await client
      .db("simple-cleaning-app")
      .collection<Room>("rooms")
      .deleteOne({ id: roomId });
    res.send(data);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
};
