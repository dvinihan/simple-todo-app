import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../util/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;

    const data = await client
      .db("simple-cleaning-app")
      .collection("rooms")
      .find()
      .toArray();
    const highestId = data.reduce(
      (max, room) => (room.id > max ? room.id : max),
      -1
    );
    res.send({ rooms: data, nextId: highestId + 1 });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
