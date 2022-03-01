// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";

type Data = {
  firstName: string;
  lastName: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const params = req.query;
  const body = req.body;
  const auth = req.headers.authorization;

  console.log("body", body);
  console.log("auth", auth);
  console.log("params", params);

  //403
  res.status(StatusCodes.UNAUTHORIZED).json({ firstName: "a", lastName: "b" });
}
