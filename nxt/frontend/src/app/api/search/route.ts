import { API_URL } from "@/app/config";
import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const title = searchParams.get("title");
  const page = searchParams.get("page");

  const params = { title: title ? title : undefined, page };

  const response = await axios.get(`${API_URL}/search`, {
    params,
  });
  const data = response.data;
  return Response.json(data);
}
