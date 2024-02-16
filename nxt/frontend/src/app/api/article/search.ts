import apiHandler from "@/app/_components/utils/apiHandler";
import { requestServer } from "@/app/_components/utils/axios";
import { NextApiRequest, NextApiResponse } from "next";

const onGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const params = req?.query;
  const url = `${process.env.BACKEND_URL}/articles/`;
  const result = await requestServer(
    url,
    {
      method: "GET",
      params,
    },
    req,
    res
  );
  return res.status(result?.status as number).json(result?.data);
};

export default apiHandler({
  get: onGet,
});
