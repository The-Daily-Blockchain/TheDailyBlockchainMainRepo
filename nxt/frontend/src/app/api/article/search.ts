import apiHandler from "@/app/(components)/utils/apiHandler";
import { requestServer } from "@/app/(components)/utils/axios";
import { NextApiRequest, NextApiResponse } from "next";

const onGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const params = req?.query;
  const url = `${process.env.PAYMENT_BASE_URL}/bank-account/`;
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
