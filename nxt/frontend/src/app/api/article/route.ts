import { API_URL } from "@/app/config";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {
  const page = req.nextUrl.searchParams.get("page");
  console.log(page);
  const response = await axios.get(`${API_URL}/articles?page=${page}`);

  const data = response.data;
  return Response.json(data);
}
