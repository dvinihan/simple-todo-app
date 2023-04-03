import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getErrorMessage } from "../../helpers/getErrorMessage";
import clientPromise from "../../util/mongodb";

const saveTask = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;

    const { _id, ...restBody } = req.body;
    const data = await client
      .db("simple-todo-app")
      .collection("tasks")
      .updateOne(
        { _id: new ObjectId(_id) },
        { $set: { ...restBody } },
        { upsert: true }
      );
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: getErrorMessage(err) });
  }
};

export default saveTask;
