import { API_URL } from "@/app/config";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const response = await axios.get(`${API_URL}/posts/`);
  const data = response.data;
  return Response.json(data);
}
