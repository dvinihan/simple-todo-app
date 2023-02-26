import { NextApiRequest, NextApiResponse } from "next";
import { getErrorMessage } from "../../helpers/getErrorMessage";
import { Section } from "../../types";
import clientPromise from "../../util/mongodb";

const sections = async (
  req: NextApiRequest,
  res: NextApiResponse<Section[] | Error>
) => {
  try {
    const client = await clientPromise;

    const data = await client
      .db("simple-todo-app")
      .collection<Section>("sections")
      .find()
      .toArray();

    res.send(data);
  } catch (err) {
    res
      .status(500)
      .send({ name: "task sections error", message: getErrorMessage(err) });
  }
};

export default sections;
