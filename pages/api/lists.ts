import { NextApiRequest, NextApiResponse } from "next";
import { getErrorMessage } from "../../helpers/getErrorMessage";
import { List } from "../../types";
import clientPromise from "../../util/mongodb";

const lists = async (
  req: NextApiRequest,
  res: NextApiResponse<List[] | Error>
) => {
  try {
    const client = await clientPromise;

    const data = await client
      .db("simple-todo-app")
      .collection<List>("lists")
      .find()
      .toArray();

    res.send(data);
  } catch (err) {
    res
      .status(500)
      .send({ name: "task lists error", message: getErrorMessage(err) });
  }
};

export default lists;
