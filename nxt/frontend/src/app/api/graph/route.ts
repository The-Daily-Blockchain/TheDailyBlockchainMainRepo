import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const symbol = searchParams.get("symbol");
  const interval = searchParams.get("interval");
  const startTime = searchParams.get("startTime");

  const params = { symbol, interval, startTime };

  const response = await axios.get("https://api.binance.com/api/v3/uiKlines", {
    params,
  });
  const data = response.data;
  return Response.json(data);
}
