import { API_URL } from "@/app/config";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET() {
  const response = await fetch(`${API_URL}/articles/`);

  const data = await response.json();

  return Response.json(data);
}
