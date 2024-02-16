/* eslint-disable consistent-return */
import get from "lodash/get";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

interface Handler {
  [method: string]: NextApiHandler;
}

const errorHandler = (err: any, res: NextApiResponse) => {
  const errorData = get(err, "response.data") || get(err, "data");
  const statusCode = get(err, "status") || get(err, "response.status") || 500;
  const request = get(err, "request");
  const message = get(err, "message");
  if (errorData) {
    res.status(statusCode).json(errorData);
  } else if (request) {
    res.status(500).json({ message: "Error: No response from server" });
  } else {
    res.status(500).json({ message });
  }
};

const apiHandler = (handler: Handler) => {
  return async (
    req: NextApiRequest & { method: string },
    res: NextApiResponse
  ) => {
    const method = req.method?.toLocaleLowerCase();
    if (!handler[method])
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    try {
      await handler[method](req, res);
    } catch (err: any) {
      return errorHandler(err, res);
    }
  };
};

export default apiHandler;
