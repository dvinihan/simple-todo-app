import { NextApiRequest, NextApiResponse } from "next";
import { Room } from "../../types";
import clientPromise from "../../util/mongodb";

type RoomsApiResponse = {
  rooms: Room[];
  nextId: number;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<RoomsApiResponse | Error>
) => {
  try {
    const client = await clientPromise;

    const data = await client
      .db("simple-cleaning-app")
      .collection<Room>("rooms")
      .find()
      .toArray();
    const highestId = data.reduce(
      (max, room) => (room.id > max ? room.id : max),
      -1
    );
    res.send({ rooms: data, nextId: highestId + 1 });
  } catch (err: any) {
    res.status(500).send({ name: "rooms error", message: err.message });
  }
};
