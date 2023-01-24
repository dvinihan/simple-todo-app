import { NextApiRequest, NextApiResponse } from "next";
import { getErrorMessage } from "../../../helpers/getErrorMessage";
import { getParamValue } from "../../../helpers/getParamValue";
import { Room, Task } from "../../../types";
import clientPromise from "../../../util/mongodb";

const deleteRoom = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;

    const roomIdString = getParamValue(req.query["id"]);
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
  } catch (err) {
    res.status(500).send({ message: getErrorMessage(err) });
  }
};

export default deleteRoom;
